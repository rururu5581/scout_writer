
import React, { useState, useEffect } from 'react';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { CheckIcon } from './icons/CheckIcon';

interface OutputSectionProps {
  generatedText: string;
  isLoading: boolean;
}

const LoadingSkeleton: React.FC = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
     <div className="h-4 bg-gray-200 rounded w-1/2 pt-4"></div>
     <div className="space-y-2">
        <div className="h-4 bg-gray-200 rounded"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);


const OutputSection: React.FC<OutputSectionProps> = ({ generatedText, isLoading }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (generatedText) {
      setCopied(false);
    }
  }, [generatedText]);

  const handleCopy = () => {
    if (!generatedText) return;
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isLoading && !generatedText) {
    return null;
  }

  return (
    <section className="mt-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">生成結果</h2>
      <div className="relative p-6 bg-gray-50 border border-gray-200 rounded-lg shadow-inner">
        {isLoading ? (
            <LoadingSkeleton />
        ) : (
            <>
                <button
                    onClick={handleCopy}
                    className="absolute top-3 right-3 p-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-morich-red"
                    aria-label="Copy to clipboard"
                >
                    {copied ? <CheckIcon className="w-5 h-5 text-green-600" /> : <ClipboardIcon className="w-5 h-5" />}
                </button>
                <div className="max-h-[500px] overflow-y-auto pr-4">
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed font-serif">{generatedText}</p>
                </div>
            </>
        )}
      </div>
    </section>
  );
};

export default OutputSection;
