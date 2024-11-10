// src/components/AnalysisResult.tsx
import React from 'react';
import { AnalysisResult as AnalysisResultType } from '../types';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  return (
    <div className="mt-4">
      {/* 実装は後ほど追加 */}
      <pre className="bg-gray-50 p-4 rounded">
        {JSON.stringify(result, null, 2)}
      </pre>
    </div>
  );
};

export default AnalysisResult;