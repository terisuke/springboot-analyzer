import React from 'react';
import FileUpload from './components/FileUpload';
import Header from './components/Header';
import { AnalysisResult } from './types';

const App: React.FC = () => {
  const [result, setResult] = React.useState<AnalysisResult | null>(null);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <FileUpload onAnalysisComplete={setResult} />
          {result && (
            <div className="mt-8">
              {/* 後でAnalysisResultコンポーネントを実装 */}
              <pre className="bg-gray-50 p-4 rounded">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;