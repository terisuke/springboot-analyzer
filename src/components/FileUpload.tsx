import React, { useState } from 'react';
import axios from 'axios';
import { AnalysisResult } from '../types';

interface FileUploadProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onAnalysisComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post<AnalysisResult>(
        `${process.env.REACT_APP_API_URL}/api/analyze`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      onAnalysisComplete(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-500">SpringBoot project files (ZIP)</p>
            </div>
            <input
              type="file"
              className="hidden"
              accept=".zip,.jar"
              onChange={handleFileChange}
            />
          </label>
        </div>
        {file && (
          <div className="text-sm text-gray-600">
            Selected file: {file.name}
          </div>
        )}
        {error && (
          <div className="text-sm text-red-600">
            {error}
          </div>
        )}
        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
            (loading || !file) && 'opacity-50 cursor-not-allowed'
          }`}
        >
          {loading ? 'Analyzing...' : 'Analyze Project'}
        </button>
      </form>
    </div>
  );
};

export default FileUpload;