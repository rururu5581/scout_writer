
import React from 'react';

interface InputSectionProps {
  resume: string;
  setResume: (value: string) => void;
  jobInfo: string;
  setJobInfo: (value:string) => void;
  onGenerate: () => void;
  onClear: () => void;
  isLoading: boolean;
}

const InputSection: React.FC<InputSectionProps> = ({
  resume,
  setResume,
  jobInfo,
  setJobInfo,
  onGenerate,
  onClear,
  isLoading,
}) => {
  return (
    <section className="space-y-6">
      <div>
        <label htmlFor="resume" className="block text-lg font-semibold text-gray-700 mb-2">
          職務経歴書
        </label>
        <textarea
          id="resume"
          value={resume}
          onChange={(e) => setResume(e.target.value)}
          placeholder="ここに候補者の職務経歴書を貼り付けてください"
          className="w-full h-64 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-morich-red focus:border-morich-red transition duration-150 ease-in-out resize-y"
          aria-label="Candidate's Resume"
        />
      </div>
      <div>
        <label htmlFor="jobInfo" className="block text-lg font-semibold text-gray-700 mb-2">
          求人情報 (任意)
        </label>
        <textarea
          id="jobInfo"
          value={jobInfo}
          onChange={(e) => setJobInfo(e.target.value)}
          placeholder="求人情報を入力すると、より精度の高い文面が作成できます（任意）"
          className="w-full h-40 p-4 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-morich-red focus:border-morich-red transition duration-150 ease-in-out resize-y"
          aria-label="Job Information (Optional)"
        />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <button
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center px-12 py-3 border border-transparent text-base font-bold rounded-full text-white bg-morich-red hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-morich-red transition-transform transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              生成中...
            </>
          ) : (
            'スカウト文面を作成する'
          )}
        </button>
        <button
          onClick={onClear}
          disabled={isLoading}
          className="w-full sm:w-auto px-10 py-3 border border-gray-300 text-base font-bold rounded-full text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors disabled:opacity-50"
        >
          クリア
        </button>
      </div>
    </section>
  );
};

export default InputSection;
