import express from 'express';
import {
  upload,
  uploadPdf,
  getUserPdfs,
  getPdf,
  deletePdf
} from '../controllers/pdfController.js';
import { requireAuth, ensureUser } from '../middleware/authMiddleware.js';

const router = express.Router();

// All PDF routes require authentication
router.use(requireAuth);
router.use(ensureUser);

// Upload new PDF
router.post('/upload', upload.single('pdf'), uploadPdf as express.RequestHandler);

// Get all user's PDFs
router.get('/', getUserPdfs as express.RequestHandler);

// Get single PDF
router.get('/:id', getPdf as express.RequestHandler);

// Delete PDF
router.delete('/:id', deletePdf as express.RequestHandler);

export default router;