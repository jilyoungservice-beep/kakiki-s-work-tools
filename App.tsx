import React, { useState } from 'react';
import { ContractForm } from './components/ContractForm';
import { ContractPreview } from './components/ContractPreview';
import { ContractData, INITIAL_DATA } from './types';
import { ArrowLeft, Printer } from 'lucide-react';

const App: React.FC = () => {
  const [data, setData] = useState<ContractData>(INITIAL_DATA);
  const [view, setView] = useState<'edit' | 'print'>('edit');

  const handlePreview = () => {
    setView('print');
    // 自动触发打印，给予少量延迟确保DOM渲染完成
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className={`min-h-screen ${view === 'print' ? 'bg-gray-600' : 'bg-gray-100'} print:bg-white transition-colors duration-300`}>
      {/* Navigation / Header (Hidden when printing) */}
      <div className={`bg-slate-900 text-white p-4 shadow-md print:hidden ${view === 'print' ? 'fixed top-0 w-full z-50' : ''}`}>
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
             {view === 'print' && (
                <button 
                    onClick={() => setView('edit')}
                    className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                    title="返回编辑"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
             )}
            <span className="text-xl font-bold tracking-tight">Contract<span className="text-indigo-400">Genius</span> 智能合同</span>
          </div>
          {view === 'print' && (
             <button 
                onClick={() => window.print()} 
                className="bg-white text-slate-900 px-4 py-2 rounded-md font-bold text-sm hover:bg-indigo-50 flex items-center gap-2 shadow-sm active:scale-95 transition-transform cursor-pointer"
             >
                <Printer className="w-4 h-4" />
                立即打印
             </button>
          )}
        </div>
      </div>

      <div className={`transition-all duration-300 ${view === 'print' ? 'pt-20 pb-20' : 'py-8'} print:p-0 print:m-0`}>
        
        {view === 'edit' ? (
          <ContractForm 
            data={data} 
            onChange={setData} 
            onPrint={handlePreview}
          />
        ) : (
          <div className="flex justify-center print:block print:w-full">
            <ContractPreview data={data} />
          </div>
        )}

      </div>
    </div>
  );
};

export default App;