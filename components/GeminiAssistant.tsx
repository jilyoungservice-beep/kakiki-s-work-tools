import React, { useState } from 'react';
import { draftClause } from '../services/geminiService';
import { Loader2, Sparkles, Plus } from 'lucide-react';

interface GeminiAssistantProps {
  contractType: string;
  onAccept: (text: string) => void;
  label: string;
}

export const GeminiAssistant: React.FC<GeminiAssistantProps> = ({ contractType, onAccept, label }) => {
  const [context, setContext] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleDraft = async () => {
    if (!context.trim()) return;
    setLoading(true);
    const text = await draftClause(label, context, contractType);
    setResult(text);
    setLoading(false);
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-4">
      <div className="flex items-center gap-2 mb-2 text-blue-700 font-semibold text-sm">
        <Sparkles className="w-4 h-4" />
        AI 助手：起草{label}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder={`请输入关键词，例如："预付30%，见票即付" 或 "空运至上海机场"`}
          className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyDown={(e) => e.key === 'Enter' && handleDraft()}
        />
        <button
          onClick={handleDraft}
          disabled={loading || !context}
          className="bg-blue-600 text-white px-3 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-50 flex items-center shrink-0"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : '生成条款'}
        </button>
      </div>
      
      {result && (
        <div className="mt-3 p-3 bg-white rounded border border-gray-200 shadow-sm animate-in fade-in slide-in-from-top-2">
          <p className="text-sm text-gray-700 mb-2 leading-relaxed">{result}</p>
          <div className="flex justify-end gap-2">
             <button
              onClick={() => setResult('')}
              className="text-xs text-gray-500 hover:text-gray-700 underline"
            >
              放弃
            </button>
            <button
              onClick={() => { onAccept(result); setResult(''); setContext(''); }}
              className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> 采纳
            </button>
          </div>
        </div>
      )}
    </div>
  );
};