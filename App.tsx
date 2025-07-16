
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import OutputSection from './components/OutputSection';
import { generateScoutEmail } from './services/geminiService';

const App: React.FC = () => {
  const [resume, setResume] = useState<string>('');
  const [jobInfo, setJobInfo] = useState<string>('');
  const [generatedText, setGeneratedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!resume.trim()) {
      setError('職務経歴書を入力してください。');
      return;
    }
    setError(null);
    setIsLoading(true);
    setGeneratedText('');

    try {
      const scoutText = await generateScoutEmail(resume, jobInfo);
      setGeneratedText(scoutText);
    } catch (err) {
      console.error(err);
      setError('スカウト文面の生成中にエラーが発生しました。時間をおいて再度お試しください。');
    } finally {
      setIsLoading(false);
    }
  }, [resume, jobInfo]);

  const handleClear = useCallback(() => {
    setResume('');
    setJobInfo('');
    setGeneratedText('');
    setError(null);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-4 sm:p-6 lg:p-8 flex justify-center">
      <div className="w-full max-w-5xl">
        <Header />
        <main className="bg-white shadow-xl rounded-2xl p-6 md:p-10">
          <InputSection
            resume={resume}
            setResume={setResume}
            jobInfo={jobInfo}
            setJobInfo={setJobInfo}
            onGenerate={handleGenerate}
            onClear={handleClear}
            isLoading={isLoading}
          />
          {error && (
            <div className="mt-4 text-center text-red-600 bg-red-100 p-3 rounded-lg">
              {error}
            </div>
          )}
          <OutputSection generatedText={generatedText} isLoading={isLoading} />
        </main>
        <footer className="text-center text-gray-500 mt-8 text-sm">
          <p>&copy; {new Date().getFullYear()} morich scout writer. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
