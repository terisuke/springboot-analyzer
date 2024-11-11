// src/components/AnalysisResult.tsx
import React, { useState } from 'react';
import { AnalysisResult as AnalysisResultType } from '../types';
import MethodDetailsModal from './MethodDetailsModal';
import { analyzeFunctionWithDify } from '../services/difyApi';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [methodAnalysis, setMethodAnalysis] = useState<Record<string, {
    analysis: string;
    sourceCode?: string;
  }>>({});
  const [loadingMethods, setLoadingMethods] = useState<Record<string, boolean>>({});

  const handleViewMethods = (className: string) => {
    setSelectedClass(className);
  };

  const handleAnalyzeMethod = async (methodName: string) => {
    try {
      setLoadingMethods(prev => ({ ...prev, [methodName]: true }));
      
      // Dify APIを呼び出して分析
      const analysis = await analyzeFunctionWithDify(
        selectedClass!,
        methodName
      );

      setMethodAnalysis(prev => ({
        ...prev,
        [methodName]: {
          analysis: analysis, // Dify APIからの応答
          sourceCode: result.classes.find(c => c.className === selectedClass)?.methodSources[methodName]
        }
      }));
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoadingMethods(prev => ({ ...prev, [methodName]: false }));
    }
  };

  // 必要なプロパティの存在チェック
  if (!result || !result.classes) {
    return <div>データが不完全です</div>;
  }

  return (
    <div className="space-y-6">
      {/* サマリーセクション */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">総ファイル数</h3>
          <p className="text-2xl">{result.totalFiles || 0}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">総クラス数</h3>
          <p className="text-2xl">{result.totalClasses || 0}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">総メソッド数</h3>
          <p className="text-2xl">{result.totalMethods || 0}</p>
        </div>
      </div>

      {/* クラス詳細テーブル */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                クラス名
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                メソッド数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                行数
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                詳細
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {result.classes.map((cls, index) => (
              <tr key={`${cls.className}-${index}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  {cls.className}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cls.methodCount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {cls.lineCount || 0}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleViewMethods(cls.className)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    View Methods
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <MethodDetailsModal
        isOpen={!!selectedClass}
        onClose={() => setSelectedClass(null)}
        className={selectedClass || ''}
        methodNames={result.classes.find(c => c.className === selectedClass)?.methodNames || []}
        methodAnalysis={methodAnalysis}
        onAnalyzeMethod={handleAnalyzeMethod}
        isLoading={loadingMethods}
        classInfo={result.classes.find(c => c.className === selectedClass)}
      />
    </div>
  );
};

export default AnalysisResult;