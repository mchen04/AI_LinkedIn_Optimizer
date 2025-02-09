import mongoose, { Document, Schema, Types } from 'mongoose';
import { IUser } from './User.js';

interface IPdfAnalysis {
  suggestions: string[];
  provider: string;
  timestamp: Date;
}

export interface IPdf {
  _id?: Types.ObjectId;
  userId: Types.ObjectId;
  filename: string;
  originalPath: string;
  extractedText: string;
  analysis: IPdfAnalysis[];
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPdfDocument extends IPdf, Document {
  _id: Types.ObjectId;
  fileUrl: string; // Virtual field
}

export type CreatePdfInput = Omit<IPdf, '_id' | 'createdAt' | 'updatedAt'>;

const pdfSchema = new Schema<IPdfDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User ID is required']
    },
    filename: {
      type: String,
      required: [true, 'Filename is required']
    },
    originalPath: {
      type: String,
      required: [true, 'Original file path is required']
    },
    extractedText: {
      type: String,
      required: [true, 'Extracted text is required']
    },
    analysis: [{
      suggestions: [{
        type: String,
        required: true
      }],
      provider: {
        type: String,
        required: true,
        enum: ['openai', 'anthropic']
      },
      timestamp: {
        type: Date,
        default: Date.now
      }
    }],
    status: {
      type: String,
      required: true,
      enum: ['pending', 'processing', 'completed', 'failed'],
      default: 'pending'
    },
    error: {
      type: String
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Indexes for better query performance
pdfSchema.index({ userId: 1, createdAt: -1 });
pdfSchema.index({ status: 1 });

// Virtual field for file URL
pdfSchema.virtual('fileUrl').get(function(this: IPdfDocument) {
  return `/uploads/${this.filename}`;
});

// Clean up old files middleware
pdfSchema.pre('deleteOne', { document: true, query: false }, async function(this: IPdfDocument) {
  console.log('Cleaning up files for PDF:', this.filename);
  // TODO: Implement file cleanup
  // This will be handled by a separate service to clean up files from storage
});

const Pdf = mongoose.model<IPdfDocument>('Pdf', pdfSchema);

export default Pdf;