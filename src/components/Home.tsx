import React from 'react';
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';

interface HomeProps {
  onSelectTool: (tool: 'foundations' | 'essentials') => void;
}

const ChoiceButton: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}> = ({ icon, title, desc, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className="group w-full text-left bg-white border-2 border-[#D5DED8] hover:border-[#2F5D50] rounded-2xl p-6 sm:p-7 shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center gap-4"
  >
    <span className="w-14 h-14 rounded-xl bg-[#2F5D50]/10 text-[#2F5D50] group-hover:bg-[#2F5D50] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
      {icon}
    </span>
    <span className="flex-1">
      <span className="block text-xl sm:text-2xl font-extrabold text-[#2E2B26] group-hover:text-[#2F5D50] transition-colors">
        {title}
      </span>
      <span className="block text-sm text-[#5C6B62] mt-1 leading-snug">{desc}</span>
    </span>
    <ArrowRight className="w-6 h-6 text-[#2F5D50] shrink-0 transition-transform group-hover:translate-x-1" />
  </button>
);

export const Home: React.FC<HomeProps> = ({ onSelectTool }) => (
  <div className="max-w-3xl mx-auto px-4 py-12 sm:py-16">
    <div className="text-center mb-10 sm:mb-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#2E2B26] tracking-tight mb-4">
        Welcome to the CC Resources App
      </h2>
      <p className="text-lg sm:text-xl font-semibold text-[#2F5D50] max-w-2xl mx-auto mb-3">
        Making your homeschool journey better and easier for you and your kids.
      </p>
      <p className="text-sm sm:text-base text-[#5C6B62] max-w-2xl mx-auto leading-relaxed">
        Here you can create review packets, practice pages, and worksheets to support your
        children along their Classical Conversations learning path.
      </p>
    </div>

    <h3 className="text-center text-lg sm:text-xl font-bold text-[#2E2B26] mb-5">
      Where would you like to start?
    </h3>
    <div className="grid gap-4 sm:grid-cols-2">
      <ChoiceButton
        icon={<BookOpen className="w-7 h-7" />}
        title="Foundations"
        desc="Ages 4–12 · memory work, tracing, geography, math, fine arts"
        onClick={() => onSelectTool('foundations')}
      />
      <ChoiceButton
        icon={<GraduationCap className="w-7 h-7" />}
        title="Essentials"
        desc="Ages 9–12 · grammar, diagrams, editing, spelling"
        onClick={() => onSelectTool('essentials')}
      />
    </div>
  </div>
);
