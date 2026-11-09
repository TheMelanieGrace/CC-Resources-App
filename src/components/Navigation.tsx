import React from 'react';
import { ArrowLeft, Printer, BookOpen, GraduationCap, Home as HomeIcon } from 'lucide-react';

type NavTool = 'home' | 'foundations' | 'essentials' | 'tracing' | 'diagram' | 'geography' | 'math' | 'editor' | 'spelling' | 'finearts' | 'verbs' | 'anatomy';

const FOUNDATIONS_GROUP: NavTool[] = ['foundations', 'tracing', 'geography', 'math', 'finearts', 'anatomy'];
const ESSENTIALS_GROUP: NavTool[] = ['essentials', 'diagram', 'editor', 'spelling', 'verbs'];

interface NavigationProps {
  currentTool: NavTool;
  onSelectTool: (tool: NavTool) => void;
  onPrint?: () => void;
  printDisabled?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTool,
  onSelectTool,
  onPrint,
  printDisabled = false,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#D5DED8] shadow-xs print:static print:bg-white print:border-b print:border-[#D5DED8] print:shadow-none print:py-2">
      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-3 print:py-0 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
        <div className="flex items-center gap-3">
          <div className="no-print">
            {currentTool !== 'home' ? (
              <button
                onClick={() => onSelectTool(
                  currentTool === 'foundations' || currentTool === 'essentials'
                    ? 'home'
                    : FOUNDATIONS_GROUP.includes(currentTool) ? 'foundations' : 'essentials'
                )}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#2F5D50] hover:text-[#24493e] px-2.5 py-1.5 rounded-md hover:bg-[#E4EDE7] transition-colors"
                title="Back to all tools"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-[#2F5D50] text-white flex items-center justify-center font-bold text-lg shadow-xs">
                CC
              </div>
            )}
          </div>

          <div>
            <h1
              onClick={() => onSelectTool('home')}
              className="whitespace-nowrap text-lg sm:text-xl font-bold tracking-tight text-[#2E2B26] cursor-pointer hover:text-[#2F5D50] transition-colors leading-tight"
            >
              CC Resources App
            </h1>
            <p className="hidden sm:block text-xs sm:text-sm text-[#5C6B62] font-medium leading-tight mt-0.5 print:block">
              Custom Tools for Classical Homeschool Parents & Tutors
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 no-print">
          <nav className="flex items-center gap-1 bg-[#E4EDE7]/60 p-1 rounded-lg border border-[#D5DED8]">
            <button
              onClick={() => onSelectTool('home')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                currentTool === 'home'
                  ? 'bg-[#2F5D50] text-white font-semibold shadow-xs'
                  : 'text-[#2E2B26] hover:bg-[#FFFFFF]'
              }`}
              title="Home"
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Home</span>
            </button>
            <button
              onClick={() => onSelectTool('foundations')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                FOUNDATIONS_GROUP.includes(currentTool)
                  ? 'bg-[#2F5D50] text-white font-semibold shadow-xs'
                  : 'text-[#2E2B26] hover:bg-[#FFFFFF]'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Foundations</span>
            </button>
            <button
              onClick={() => onSelectTool('essentials')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                ESSENTIALS_GROUP.includes(currentTool)
                  ? 'bg-[#2F5D50] text-white font-semibold shadow-xs'
                  : 'text-[#2E2B26] hover:bg-[#FFFFFF]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Essentials</span>
            </button>
          </nav>

          {currentTool !== 'home' && onPrint && (
            <button
              onClick={onPrint}
              disabled={printDisabled}
              className="inline-flex items-center gap-1.5 bg-[#2F5D50] hover:bg-[#24493e] text-white px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-all disabled:opacity-50"
              title="Print to US Letter Paper"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Page</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
