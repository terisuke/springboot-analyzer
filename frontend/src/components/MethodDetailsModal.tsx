// src/components/MethodDetailsModal.tsx
import React from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

interface MethodDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  className: string;
  methodNames: string[];
  methodAnalysis: Record<string, string>;
  onAnalyzeMethod: (methodName: string) => Promise<void>;
}

const MethodDetailsModal: React.FC<MethodDetailsModalProps> = ({
  isOpen,
  onClose,
  className,
  methodNames,
  methodAnalysis,
  onAnalyzeMethod
}) => {
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="w-full max-w-2xl bg-white rounded-lg p-6">
          <DialogTitle className="text-lg font-medium mb-4">
            {className} Methods
          </DialogTitle>
          <div className="space-y-4">
            {methodNames.map((methodName) => (
              <div key={methodName} className="border rounded p-4">
                <h3 className="font-medium">{methodName}</h3>
                {methodAnalysis[methodName] ? (
                  <p className="mt-2 text-gray-600">{methodAnalysis[methodName]}</p>
                ) : (
                  <button
                    onClick={() => onAnalyzeMethod(methodName)}
                    className="mt-2 text-indigo-600 hover:text-indigo-900"
                  >
                    Analyze Method
                  </button>
                )}
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