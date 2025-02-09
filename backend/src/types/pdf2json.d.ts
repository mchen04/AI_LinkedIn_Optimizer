declare module 'pdf2json' {
  class PDFParser {
    constructor();
    on(event: 'pdfParser_dataReady', callback: (pdfData: any) => void): this;
    on(event: 'pdfParser_dataError', callback: (error: Error) => void): this;
    loadPDF(pdfFilePath: string): void;
  }

  export = PDFParser;
}