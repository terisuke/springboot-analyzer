// src/components/AnalysisResult.tsx
import React, { useState } from 'react';
import { AnalysisResult as AnalysisResultType } from '../types';
import MethodDetailsModal from './MethodDetailsModal';

interface AnalysisResultProps {
  result: AnalysisResultType;
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [methodAnalysis, setMethodAnalysis] = useState<Record<string, string>>({});

  const handleViewMethods = (className: string) => {
    setSelectedClass(className);
  };

  const getMethodNames = (className: string): string[] => {
    const classInfo = result.classes.find(cls => cls.className === className);
    return classInfo?.methodNames || [];
  };

  const handleAnalyzeMethod = async (className: string, methodName: string) => {
    try {
      // ここでバックエンドAPIからソースコードを取得する必要があります
      // const sourceCode = await fetchSourceCode(className, methodName);
      // const analysis = await analyzeFunctionWithDify(className, methodName, sourceCode);
      
      // setMethodAnalysis(prev => ({
      //   ...prev,
      //   [methodName]: analysis
      // }));
    } catch (error) {
      console.error('Method analysis failed:', error);
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
        methodNames={selectedClass ? getMethodNames(selectedClass) : []}
        methodAnalysis={methodAnalysis}
        onAnalyzeMethod={(methodName) => handleAnalyzeMethod(selectedClass!, methodName)}
      />
    </div>
  );
};

export default AnalysisResult;