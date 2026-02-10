import React, { useState } from 'react';
import GrafcetRenderer from './components/GrafcetRenderer';
import { grafcetPrincipal, grafcetHoming, grafcetUsinage, grafcetSecurite } from './data/graphs';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'principal' | 'homing' | 'usinage' | 'securite'>('principal');

  const getActiveData = () => {
    switch (activeTab) {
      case 'principal': return grafcetPrincipal;
      case 'homing': return grafcetHoming;
      case 'usinage': return grafcetUsinage;
      case 'securite': return grafcetSecurite;
      default: return grafcetPrincipal;
    }
  };

  const data = getActiveData();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans text-gray-900">
      {/* Header */}
      <header className="bg-slate-800 text-white p-4 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold tracking-tight"></h1>
          <span className="text-sm text-slate-400">CNC Machine Control Logic</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 flex flex-col gap-6">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('principal')}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === 'principal'
              ? 'bg-white text-blue-700 border-t-4 border-blue-600 shadow-sm'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            Principal
          </button>
          <button
            onClick={() => setActiveTab('homing')}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === 'homing'
              ? 'bg-white text-blue-700 border-t-4 border-blue-600 shadow-sm'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            S-G Homing (Init)
          </button>
          <button
            onClick={() => setActiveTab('usinage')}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === 'usinage'
              ? 'bg-white text-blue-700 border-t-4 border-blue-600 shadow-sm'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            S-G Usinage (Boucle)
          </button>
          <button
            onClick={() => setActiveTab('securite')}
            className={`px-4 py-2 rounded-t-lg font-medium transition-colors ${activeTab === 'securite'
              ? 'bg-white text-blue-700 border-t-4 border-blue-600 shadow-sm'
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
              }`}
          >
            Sécurité (Parallèle)
          </button>
        </div>

        {/* Diagram Area */}
        <div className="bg-white rounded-b-lg rounded-r-lg shadow-lg border border-gray-200 p-6 flex-1 flex flex-col h-[80vh]">
          <div className="mb-4 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800">{data.title}</h2>
            <p className="text-gray-500">{data.description}</p>
          </div>

          <div className="flex-1 relative overflow-hidden">
            <GrafcetRenderer data={data} />
          </div>

          <div className="mt-4 text-xs text-gray-400 flex gap-4">
            <span className="flex items-center gap-1"><span className="w-3 h-3 border border-black bg-white inline-block"></span> Étape</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 border-double border-4 border-black bg-white inline-block"></span> Étape Initiale</span>
            <span className="flex items-center gap-1"><span className="w-4 h-[2px] bg-black inline-block"></span> Transition</span>
            <span className="flex items-center gap-1"><span className="w-4 h-[4px] border-t border-b border-black inline-block"></span> Divergence ET</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;