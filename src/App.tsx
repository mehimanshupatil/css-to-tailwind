import React, { useState, useCallback } from 'react';
import { Copy, Zap, FileText, Sparkles, CheckCircle2, Settings, Brain } from 'lucide-react';
import { cssToTailwind } from './utils/cssConverter';

function App() {
  const [cssInput, setCssInput] = useState(`color: var(--Secondary-Blue-100, #003EE6);
/* New/Paragraph/P3 Semibold */
font-family: "Open Sans";
font-size: 0.625rem;
font-style: normal;
font-weight: 600;
line-height: 0.875rem; /* 140% */
letter-spacing: 0.01563rem;
display: flex;
padding: var(--XS, 0.125rem) var(--Edge, 0.375rem) var(--XS, 0.125rem) var(--S, 0.25rem);
justify-content: center;
align-items: center;
gap: var(--S, 0.25rem);
border-radius: var(--S, 0.25rem);
background: var(--Blues-Lights-30, #D0DCF0);
box-shadow: 0px 0px 0px 0px rgba(255, 91, 0, 0.12);`);
  
  const [tailwindOutput, setTailwindOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [usePrefix, setUsePrefix] = useState(true);
  const [prefix, setPrefix] = useState('cv');

  const convertCss = useCallback(() => {
    const result = cssToTailwind(cssInput, { usePrefix, prefix });
    setTailwindOutput(result);
  }, [cssInput, usePrefix, prefix]);

  React.useEffect(() => {
    convertCss();
  }, [convertCss]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(tailwindOutput);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const clearInput = () => {
    setCssInput('');
    setTailwindOutput('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">CSS to Tailwind</h1>
                <p className="text-sm text-slate-600">Intelligent CSS to Tailwind conversion with optimization</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-600">
              <Brain className="h-4 w-4" />
              <span>AI Powered</span>
            </div>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/60 p-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Settings className="h-4 w-4 text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Settings</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={usePrefix}
                  onChange={(e) => setUsePrefix(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="text-sm text-slate-700">Use prefix</span>
              </label>
              
              {usePrefix && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">Prefix:</span>
                  <input
                    type="text"
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className="px-2 py-1 text-sm border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-16"
                    placeholder="cv"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-slate-600" />
                <h2 className="text-lg font-semibold text-slate-800">CSS Input</h2>
              </div>
              <button
                onClick={clearInput}
                className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
              >
                Clear
              </button>
            </div>
            
            <div className="relative">
              <textarea
                value={cssInput}
                onChange={(e) => setCssInput(e.target.value)}
                placeholder="Enter your CSS styles here..."
                className="w-full h-80 p-4 bg-white border border-slate-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none font-mono text-sm leading-relaxed"
                style={{ fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace' }}
              />
              <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                {cssInput.split('\n').length} lines
              </div>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="p-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded">
                  <Sparkles className="h-3 w-3 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">Tailwind Output</h2>
              </div>
              <button
                onClick={copyToClipboard}
                className="flex items-center space-x-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors shadow-sm"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    <span className="text-sm">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    <span className="text-sm">Copy</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="relative">
              <div className="w-full h-80 p-4 bg-slate-900 text-green-400 rounded-xl shadow-lg overflow-auto font-mono text-sm leading-relaxed">
                {tailwindOutput || (
                  <span className="text-slate-500">Tailwind classes will appear here...</span>
                )}
              </div>
              {tailwindOutput && (
                <div className="absolute bottom-3 right-3 text-xs text-slate-500">
                  {tailwindOutput.split(' ').length} classes
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/60">
            <div className="p-2 bg-blue-100 rounded-lg w-fit mb-4">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Smart Optimization</h3>
            <p className="text-sm text-slate-600">Combines pt-0.5 pb-0.5 into py-0.5 automatically</p>
          </div>
          
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/60">
            <div className="p-2 bg-green-100 rounded-lg w-fit mb-4">
              <FileText className="h-5 w-5 text-green-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Font Comments</h3>
            <p className="text-sm text-slate-600">Converts font comments to Tailwind class names</p>
          </div>
          
          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/60">
            <div className="p-2 bg-purple-100 rounded-lg w-fit mb-4">
              <Sparkles className="h-5 w-5 text-purple-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">CSS Variables</h3>
            <p className="text-sm text-slate-600">Smart handling of CSS custom properties</p>
          </div>

          <div className="p-6 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-slate-200/60">
            <div className="p-2 bg-orange-100 rounded-lg w-fit mb-4">
              <Settings className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="font-semibold text-slate-800 mb-2">Custom Prefixes</h3>
            <p className="text-sm text-slate-600">Add custom prefixes like 'cv:' to all classes</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-slate-200/60 bg-white/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-slate-600">
            Built with React, TypeScript, and Tailwind CSS • Intelligent CSS conversion
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;