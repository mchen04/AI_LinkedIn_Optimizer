import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import { Types } from 'mongoose';
import Pdf, { IPdfDocument, CreatePdfInput } from '../models/Pdf.js';
import { AppError } from '../middleware/errorMiddleware.js';
import env from '../config/env.js';
import { pdfService } from '../services/pdfService.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure multer for PDF uploads
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const uploadPath = path.join(__dirname, '../../', env.UPLOAD_PATH);
    cb(null, uploadPath);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  }
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new AppError('Only PDF files are allowed', 400));
  }
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: env.MAX_FILE_SIZE // 5MB default
  }
});

interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    email: string;
  };
}

// Upload PDF file
export const uploadPdf = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      throw new AppError('No file uploaded', 400);
    }

    // Create PDF document
    const pdfInput: CreatePdfInput = {
      userId: new Types.ObjectId(req.user.id),
      filename: req.file.filename,
      originalPath: req.file.path,
      extractedText: '', // Will be populated by text extraction service
      status: 'pending',
      analysis: []
    };

    const pdf = await Pdf.create(pdfInput);

    // Start processing in the background
    pdfService.processPDF(pdf._id.toString()).catch(error => {
      console.error('Background processing failed:', error);
    });

    res.status(201).json({
      status: 'success',
      data: {
        pdf: {
          id: pdf._id.toString(),
          filename: pdf.filename,
          status: pdf.status,
          fileUrl: pdf.fileUrl
        }
      }
    });
  } catch (error) {
    // Clean up uploaded file if database operation fails
    if (req.file) {
      await fs.unlink(req.file.path).catch(console.error);
    }
    next(error);
  }
};

// Get processing status
export const getProcessingStatus = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const status = await pdfService.getProcessingStatus(req.params.id);
    res.json({
      status: 'success',
      data: status
    });
  } catch (error) {
    next(error);
  }
};

// Get user's PDFs
export const getUserPdfs = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pdfs = await Pdf.find({
      userId: new Types.ObjectId(req.user.id)
    })
      .sort({ createdAt: -1 })
      .select('-extractedText') // Exclude large text field
      .lean();

    res.json({
      status: 'success',
      data: {
        pdfs: pdfs.map(pdf => ({
          id: pdf._id.toString(),
          filename: pdf.filename,
          status: pdf.status,
          fileUrl: `/uploads/${pdf.filename}`,
          analysis: pdf.analysis,
          createdAt: pdf.createdAt
        }))
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single PDF
export const getPdf = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pdf = await Pdf.findOne({
      _id: new Types.ObjectId(req.params.id),
      userId: new Types.ObjectId(req.user.id)
    }).lean();

    if (!pdf) {
      throw new AppError('PDF not found', 404);
    }

    res.json({
      status: 'success',
      data: {
        pdf: {
          id: pdf._id.toString(),
          filename: pdf.filename,
          status: pdf.status,
          fileUrl: `/uploads/${pdf.filename}`,
          analysis: pdf.analysis,
          createdAt: pdf.createdAt,
          extractedText: pdf.extractedText
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// Delete PDF
export const deletePdf = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const pdf = await Pdf.findOne({
      _id: new Types.ObjectId(req.params.id),
      userId: new Types.ObjectId(req.user.id)
    });

    if (!pdf) {
      throw new AppError('PDF not found', 404);
    }

    try {
      // Delete file from storage
      await fs.unlink(pdf.originalPath);
    } catch (error) {
      console.error('Error deleting file:', error);
      // Continue with document deletion even if file deletion fails
    }

    // Delete document from database
    await pdf.deleteOne();

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};