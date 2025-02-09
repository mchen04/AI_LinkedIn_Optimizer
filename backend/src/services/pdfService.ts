import PDFParser from 'pdf2json';
import fs from 'fs/promises';
import { aiService } from './aiService.js';
import Pdf from '../models/Pdf.js';
import { AppError } from '../middleware/errorMiddleware.js';

class PDFService {
  private processingQueue: Set<string>;

  constructor() {
    this.processingQueue = new Set();
  }

  private async extractTextFromPDF(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      try {
        const pdfParser = new PDFParser();

        pdfParser.on('pdfParser_dataReady', (pdfData: any) => {
          try {
            // Convert PDF data to text
            const text = pdfData.Pages.map((page: any) => {
              return page.Texts.map((textItem: any) =>
                decodeURIComponent(textItem.R[0].T)
              ).join(' ');
            }).join('\n');

            resolve(text);
          } catch (error) {
            console.error('Error parsing PDF data:', error);
            reject(new AppError('Failed to parse PDF content', 500));
          }
        });

        pdfParser.on('pdfParser_dataError', (error: Error) => {
          console.error('Error parsing PDF:', error);
          reject(new AppError('Failed to parse PDF', 500));
        });

        pdfParser.loadPDF(filePath);
      } catch (error) {
        console.error('Error loading PDF:', error);
        reject(new AppError('Failed to load PDF', 500));
      }
    });
  }

  async processPDF(pdfId: string): Promise<void> {
    if (this.processingQueue.has(pdfId)) {
      console.log(`PDF ${pdfId} is already being processed`);
      return;
    }

    this.processingQueue.add(pdfId);

    try {
      const pdf = await Pdf.findById(pdfId);
      if (!pdf) {
        throw new AppError('PDF not found', 404);
      }

      // Update status to processing
      pdf.status = 'processing';
      await pdf.save();

      // Extract text from PDF
      const extractedText = await this.extractTextFromPDF(pdf.originalPath);
      pdf.extractedText = extractedText;

      // Analyze with AI service
      const analysis = await aiService.analyzeResume(extractedText);

      // Update PDF document with results
      pdf.analysis.push({
        suggestions: analysis.suggestions,
        provider: analysis.provider,
        timestamp: new Date()
      });

      pdf.status = 'completed';
      await pdf.save();

    } catch (error) {
      console.error(`Error processing PDF ${pdfId}:`, error);
      
      // Update PDF status to failed
      const pdf = await Pdf.findById(pdfId);
      if (pdf) {
        pdf.status = 'failed';
        pdf.error = error instanceof Error ? error.message : 'Unknown error';
        await pdf.save();
      }

      throw error;
    } finally {
      this.processingQueue.delete(pdfId);
    }
  }

  async getProcessingStatus(pdfId: string): Promise<{
    status: string;
    error?: string;
    progress?: number;
  }> {
    const pdf = await Pdf.findById(pdfId);
    if (!pdf) {
      throw new AppError('PDF not found', 404);
    }

    return {
      status: pdf.status,
      error: pdf.error,
      progress: this.processingQueue.has(pdfId) ? 50 : undefined // Simple progress indication
    };
  }

  isProcessing(pdfId: string): boolean {
    return this.processingQueue.has(pdfId);
  }

  getQueueSize(): number {
    return this.processingQueue.size;
  }
}

// Export singleton instance
export const pdfService = new PDFService();