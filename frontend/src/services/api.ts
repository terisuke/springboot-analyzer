// src/services/api.ts
import axios from 'axios';
import { AnalysisResult } from '../types';

const API_URL = process.env.REACT_APP_API_URL;

export const analyzeProject = async (file: File): Promise<AnalysisResult> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post<AnalysisResult>(
    `${API_URL}/api/analyze`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );

  return response.data;
};