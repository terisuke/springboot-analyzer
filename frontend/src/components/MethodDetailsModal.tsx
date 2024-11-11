// src/components/MethodDetailsModal.tsx
import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { ClassInfo } from '../types';

interface MethodDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  className: string;
  methodNames: string[];
  methodAnalysis: Record<string, {
    analysis: string;
    sourceCode?: string;  // ソースコードを保存
  }>;
  onAnalyzeMethod: (methodName: string) => Promise<void>;
  isLoading?: Record<string, boolean>;  // 分析中の状態を管理
  classInfo: ClassInfo | undefined;
}

const MethodDetailsModal: React.FC<MethodDetailsModalProps> = ({
  isOpen,
  onClose,
  className,
  methodNames,
  methodAnalysis,
  onAnalyzeMethod,
  isLoading = {},
  classInfo
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-4xl bg-white rounded-lg p-6 overflow-y-auto max-h-screen">
          <DialogTitle className="text-lg font-medium mb-4">
            {className} Methods
          </DialogTitle>
          <div className="space-y-4">
            {methodNames.map((methodName) => (
              <div key={methodName} className="border rounded p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium">{methodName}</h3>
                    <pre className="mt-2 p-2 bg-gray-50 rounded text-sm overflow-x-auto whitespace-pre-wrap">
                      {classInfo?.methodSources[methodName] || 'ソースコードがありません'}
                    </pre>
                    {!methodAnalysis[methodName] && (
                      <button
                        onClick={() => onAnalyzeMethod(methodName)}
                        className="mt-2 text-indigo-600 hover:text-indigo-900"
                        disabled={isLoading[methodName]}
                      >
                        {isLoading[methodName] ? '分析中...' : '詳細分析'}
                      </button>
                    )}
                  </div>
                  {methodAnalysis[methodName] && (
                    <div className="flex-1 ml-4">
                      <textarea
                        className="w-full h-24 p-2 border rounded whitespace-pre-wrap"
                        value={methodAnalysis[methodName].analysis}
                        readOnly
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded"
          >
            Close
          </button>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default MethodDetailsModal;