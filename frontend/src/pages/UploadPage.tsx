import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Upload, FileText, ArrowLeft, Loader2, Info } from 'lucide-react';

export function UploadPage() {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      await handleUpload(file);
    } else {
      setError('Please upload a PDF file');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        await handleUpload(file);
      } else {
        setError('Please upload a PDF file');
      }
    }
  };

  const handleUpload = async (file: File) => {
    setError(null);
    setIsUploading(true);
    try {
      // Simulate file processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, we would:
      // 1. Upload the file to a server
      // 2. Process the PDF to extract profile information
      // 3. Store the extracted data for analysis
      
      navigate({ to: '/analysis' });
    } catch (err) {
      setError('Failed to process the file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate({ to: '/' })}
        className="mb-8 text-gray-600 hover:text-gray-900 flex items-center space-x-2"
      >
        <ArrowLeft className="icon-sm" />
        <span>Back to Home</span>
      </button>

      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Upload Your LinkedIn Profile PDF
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            We'll analyze your profile and provide AI-powered suggestions for improvement
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="space-y-6">
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-300 hover:border-primary-500'
              }`}
            >
              {isUploading ? (
                <div className="flex flex-col items-center space-y-4">
                  <Loader2 className="icon-xl text-primary-600 animate-spin" />
                  <p className="text-lg font-medium text-gray-900">Processing your profile...</p>
                </div>
              ) : (
                <>
                  <Upload className="icon-xl text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drag and drop your LinkedIn Profile PDF here
                  </p>
                  <p className="text-gray-500 mb-4">or</p>
                  <label className="btn-primary cursor-pointer inline-flex items-center space-x-2">
                    <FileText className="icon-sm" />
                    <span>Select PDF File</span>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <Info className="icon-sm text-red-500 mt-0.5" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                How to export your LinkedIn Profile as PDF:
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600">
                <li>Visit your LinkedIn profile page</li>
                <li>Click the "More" button below your profile header</li>
                <li>Select "Save to PDF" from the dropdown menu</li>
                <li>Wait for the PDF to generate and download</li>
                <li>Upload the downloaded PDF file here</li>
              </ol>
              <div className="mt-4 flex items-start space-x-2 text-sm text-gray-500">
                <Info className="icon-sm flex-shrink-0 mt-0.5" />
                <p>Make sure your profile is up to date before exporting to get the most accurate recommendations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}