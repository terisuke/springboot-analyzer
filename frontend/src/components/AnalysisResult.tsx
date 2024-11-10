// src/components/AnalysisResult.tsx
import React from 'react';
import { AnalysisResult as AnalysisResultType } from '../types';

interface AnalysisResultProps {
  result: AnalysisResultType
}

const AnalysisResult: React.FC<AnalysisResultProps> = ({ result }) => {
  // 必要なプロパティの存在チェック
  if (!result || !result.classes) {
    return <div>データが不完全です</div>;
  }

  return (
    <div className="space-y-6">
      {/* サマリーセクション */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total Files</h3>
          <p className="text-2xl">{result.totalFiles || 0}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total Classes</h3>
          <p className="text-2xl">{result.totalClasses || 0}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold">Total Methods</h3>
          <p className="text-2xl">{result.totalMethods || 0}</p>
        </div>
      </div>

      {/* クラス詳細テーブル */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Method Count
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lines
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
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
                    onClick={() => {/* メソッド一覧表示ロジック */}}
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
    </div>
  );
};

export default AnalysisResult;