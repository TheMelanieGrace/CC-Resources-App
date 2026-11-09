import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './components/Home';
import { TracingTool } from './components/TracingTool';
import { DiagramTool } from './components/DiagramTool';
import { GeographyTool } from './components/GeographyTool';
import { MathPracticeTool } from './components/MathPracticeTool';
import { EditorPracticeTool } from './components/EditorPracticeTool';
import { FoundationsHub, EssentialsHub } from './components/Hubs';
import { SpellingTool } from './components/SpellingTool';
import { FineArtsTool } from './components/FineArtsTool';
import { VerbChartTool } from './components/VerbChartTool';
import { AnatomyTool } from './components/AnatomyTool';
import { LatinChartTool } from './components/LatinChartTool';
import { StarterCategory } from './data/starterPacks';

export type ActiveTool = 'home' | 'foundations' | 'essentials' | 'tracing' | 'diagram' | 'geography' | 'math' | 'editor' | 'spelling' | 'finearts' | 'verbs' | 'anatomy' | 'latincharts';

export default function App() {
  const [currentTool, setCurrentTool] = useState<ActiveTool>('home');
  const [pendingWorksheetImport, setPendingWorksheetImport] = useState<{
    lines: string[];
    title?: string;
  } | null>(null);
  const [initialCategory, setInitialCategory] = useState<StarterCategory | null>(null);
  const [initialPresidentsConfig, setInitialPresidentsConfig] = useState<{
    mode: 'order' | 'vps';
    start: number;
    end: number;
  } | null>(null);
  const [initialBillOfRightsConfig, setInitialBillOfRightsConfig] = useState<{
    start: number;
    end: number;
  } | null>(null);

  // Sync hash or browser history for easy back/forward navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'foundations', 'essentials', 'tracing', 'diagram', 'geography', 'math', 'editor', 'spelling', 'finearts', 'verbs', 'anatomy', 'latincharts'].includes(hash)) {
        setCurrentTool(hash as ActiveTool);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectTool = (
    tool: ActiveTool,
    options?: {
      category?: StarterCategory;
      presidentsConfig?: { mode: 'order' | 'vps'; start: number; end: number };
      billOfRightsConfig?: { start: number; end: number };
    }
  ) => {
    if (options?.category) {
      setInitialCategory(options.category);
    }
    if (options?.presidentsConfig) {
      setInitialPresidentsConfig(options.presidentsConfig);
    }
    if (options?.billOfRightsConfig) {
      setInitialBillOfRightsConfig(options.billOfRightsConfig);
    }
    setCurrentTool(tool);
    window.location.hash = tool === 'home' ? '' : tool;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToWorksheet = (lines: string[], questionTitle?: string) => {
    setPendingWorksheetImport({
      lines,
      title: questionTitle ? `Practice: ${questionTitle}` : 'Practice: AI Practice Lines',
    });
    handleSelectTool('tracing');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#EDF1EE] text-[#2E2B26] flex flex-col font-sans">
      {/* App Header */}
      <Navigation
        currentTool={currentTool}
        onSelectTool={(t) => handleSelectTool(t)}
        onPrint={currentTool !== 'home' ? handlePrint : undefined}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pb-12">
        {currentTool === 'home' && <Home onSelectTool={handleSelectTool} />}
        {currentTool === 'foundations' && <FoundationsHub onSelectTool={handleSelectTool} />}
        {currentTool === 'essentials' && <EssentialsHub onSelectTool={handleSelectTool} />}
        {currentTool === 'math' && <MathPracticeTool />}
        {currentTool === 'editor' && <EditorPracticeTool />}
        {currentTool === 'spelling' && <SpellingTool onAddToWorksheet={handleAddToWorksheet} />}
        {currentTool === 'finearts' && <FineArtsTool />}
        {currentTool === 'anatomy' && <AnatomyTool />}
        {currentTool === 'latincharts' && <LatinChartTool />}
        {currentTool === 'verbs' && <VerbChartTool />}
        {currentTool === 'tracing' && (
          <TracingTool
            onBack={() => handleSelectTool('foundations')}
            initialImport={pendingWorksheetImport}
            onClearInitialImport={() => setPendingWorksheetImport(null)}
            initialCategory={initialCategory}
            initialPresidentsConfig={initialPresidentsConfig}
            initialBillOfRightsConfig={initialBillOfRightsConfig}
            onClearInitialCategory={() => {
              setInitialCategory(null);
              setInitialPresidentsConfig(null);
              setInitialBillOfRightsConfig(null);
            }}
          />
        )}
        {currentTool === 'diagram' && (
          <DiagramTool
            onBack={() => handleSelectTool('essentials')}
            onAddToWorksheet={handleAddToWorksheet}
          />
        )}
        {currentTool === 'geography' && (
          <GeographyTool
            onBack={() => handleSelectTool('foundations')}
            onAddToWorksheet={handleAddToWorksheet}
          />
        )}
      </main>

      {/* Footer on every page of the app */}
      <footer className="no-print bg-[#FFFFFF] border-t border-[#D5DED8]/60 py-3.5 px-4 text-center">
        <p className="text-[11px] sm:text-xs text-[#7C8880] sm:whitespace-nowrap tracking-wide">
          Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
        </p>
      </footer>

      {/* Fixed Print Footer for every printed worksheet page */}
      <div className="hidden print:block print-footer-fixed">
        Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
      </div>
    </div>
  );
}
