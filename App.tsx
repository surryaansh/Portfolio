// FIX: Replaced placeholder content with a fully functional React component for a Gemini API explorer UI. This resolves multiple 'Cannot find name' errors and fixes the 'not a module' error in index.tsx by providing a default export.
import React, { useState } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';
import { FaceIcon1 } from './components/icons/FaceIcon1';
import { FaceIcon2 } from './components/icons/FaceIcon2';
import { FaceIcon3 } from './components/icons/FaceIcon3';
import { LightningIcon } from './components/icons/LightningIcon';
import CustomCursor from './components/CustomCursor';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    setError('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
      const result: GenerateContentResponse = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      setResponse(result.text);
    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
        setError(`An error occurred: ${err.message}`);
      } else {
        setError('An unknown error occurred. Please check the console.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans">
        <header className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-2">Gemini API Explorer</h1>
            <p className="text-lg text-gray-600">Bring your ideas to life</p>
        </header>
        
        <div className="flex space-x-6 mb-8">
            <FaceIcon1 className="w-16 h-16 text-gray-500 hover:text-blue-500 transition-colors" />
            <FaceIcon2 className="w-16 h-16 text-gray-500 hover:text-green-500 transition-colors" />
            <FaceIcon3 className="w-16 h-16 text-gray-500 hover:text-red-500 transition-colors" />
            <LightningIcon className="w-16 h-16 text-gray-500 hover:text-yellow-500 transition-colors" />
        </div>

        <main className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label htmlFor="prompt-input" className="mb-2 font-semibold text-gray-700">Enter your prompt</label>
              <textarea
                id="prompt-input"
                className="p-4 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., Write a poem about a robot learning to paint"
              />
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </>
                ) : 'Generate'}
              </button>
            </div>
          </form>
          
          {error && (
            <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {response && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Response</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-wrap font-mono">{response}</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default App;
