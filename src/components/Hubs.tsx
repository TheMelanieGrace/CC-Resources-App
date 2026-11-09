import React from 'react';
import { PenTool, Map, Calculator, GitFork, FileEdit, SpellCheck, Palette, BookType, HeartPulse, Landmark, ArrowRight } from 'lucide-react';
import type { ActiveTool } from '../App';
import type { StarterCategory } from '../data/starterPacks';
import { FoundationsExtras, EssentialsExtras } from './HubExtras';

export type SelectToolFn = (
  tool: ActiveTool,
  options?: {
    category?: StarterCategory;
    presidentsConfig?: { mode: 'order' | 'vps'; start: number; end: number };
    billOfRightsConfig?: { start: number; end: number };
  }
) => void;

interface HubProps {
  onSelectTool: SelectToolFn;
}

const Card: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  cta: string;
  onClick?: () => void;
  soon?: boolean;
}> = ({ icon, title, desc, cta, onClick, soon }) => (
  <div className="bg-white border border-[#D5DED8] rounded-xl p-5 flex flex-col gap-2 shadow-xs">
    <div className="flex items-center gap-2 text-[#2F5D50]">{icon}
      <h3 className="text-base font-extrabold text-[#2E2B26]">{title}</h3>
    </div>
    <p className="text-xs text-[#5C6B62] flex-1">{desc}</p>
    {soon ? (
      <span className="text-[11px] font-bold text-[#7C8880] uppercase tracking-wide">Coming soon</span>
    ) : (
      <button type="button" onClick={onClick}
        className="self-start inline-flex items-center gap-1.5 bg-[#2F5D50] hover:bg-[#24493e] text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer">
        {cta} <ArrowRight className="w-3.5 h-3.5" />
      </button>
    )}
  </div>
);

export const FoundationsHub: React.FC<HubProps> = ({ onSelectTool }) => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <h2 className="text-2xl font-extrabold text-[#2E2B26]">Foundations</h2>
    <p className="text-sm text-[#5C6B62] mt-1 mb-6 max-w-2xl">
      Memory work practice for the Foundations years: handwriting tracing for every subject,
      US geography, and math drills the traditional way.
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card icon={<PenTool className="w-5 h-5" />} title="Tracing Worksheets"
        desc="Handwriting practice and Review Packets for all subjects: Bible, Latin, Math, Science, English, History, Geography, Timeline. Print or cursive, with helper notes."
        cta="Open Tracing" onClick={() => onSelectTool('tracing')} />
      <Card icon={<Map className="w-5 h-5" />} title="Geography"
        desc="States, capitals, and map tracing: East Coast to West Coast, Alaska and Hawaii included."
        cta="Open Geography" onClick={() => onSelectTool('geography')} />
      <Card icon={<Calculator className="w-5 h-5" />} title="Math Practice Builder"
        desc="Addition, subtraction, multiplication tables, long division with the classic bracket, rounding, and skip counting. Traditional algorithms only, with answer keys."
        cta="Build Math Sheets" onClick={() => onSelectTool('math')} />
      <Card icon={<Landmark className="w-5 h-5" />} title="Latin Ending Charts"
        desc="Fill-in practice charts for the Cycle 1 noun declensions and Cycle 2 first-conjugation tenses, with answer keys. Say the memory work, then write it."
        cta="Open Latin Charts" onClick={() => onSelectTool('latincharts')} />
      <Card icon={<HeartPulse className="w-5 h-5" />} title="Body Systems"
        desc="Full-body anatomy pages: skeletal, muscular, nervous, lymphatic, digestive, and urinary systems, each with a labeled public-domain diagram and kid-level notes on what every part does."
        cta="Open Body Systems" onClick={() => onSelectTool('anatomy')} />
      <Card icon={<Palette className="w-5 h-5" />} title="Fine Arts"
        desc="Week-by-week art companion: drawing practice sheets, Great Artists studies with public-domain portraits and facts, and composer listening pages."
        cta="Open Fine Arts" onClick={() => onSelectTool('finearts')} />
    </div>
    <FoundationsExtras onSelectTool={onSelectTool} />
  </div>
);

export const EssentialsHub: React.FC<HubProps> = ({ onSelectTool }) => (
  <div className="max-w-5xl mx-auto px-4 py-8">
    <h2 className="text-2xl font-extrabold text-[#2E2B26]">Essentials</h2>
    <p className="text-sm text-[#5C6B62] mt-1 mb-6 max-w-2xl">
      Grammar and writing practice for the Essentials years: sentence diagramming,
      editor practice, spelling, and Essentials tracing.
    </p>
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card icon={<GitFork className="w-5 h-5" />} title="Sentence Diagrams"
        desc="Reed-Kellogg diagramming for all seven sentence patterns, with worked analysis, practice sentences, and printable answer keys."
        cta="Open Diagrams" onClick={() => onSelectTool('diagram')} />
      <Card icon={<FileEdit className="w-5 h-5" />} title="Editor Practice"
        desc="Be the editor: short paragraphs with planted capitalization and punctuation mistakes for students to find and fix. Answer key included."
        cta="Open Editor Practice" onClick={() => onSelectTool('editor')} />
      <Card icon={<SpellCheck className="w-5 h-5" />} title="Spelling & Homophones"
        desc="Graded spelling lists (grades 2-5) with tracing, study sheets, and dictation test pages, plus the classic homophone trouble sets."
        cta="Open Spelling" onClick={() => onSelectTool('spelling')} />
      <Card icon={<BookType className="w-5 h-5" />} title="Verb Conjugation Charts"
        desc="Fill-in conjugation practice for every Cycle 3 verb week, with helping verbs, the lay/lie and rise/raise circle exercises, and answer keys."
        cta="Open Verb Charts" onClick={() => onSelectTool('verbs')} />
      <Card icon={<PenTool className="w-5 h-5" />} title="Essentials Tracing"
        desc="Charts and definitions from the Essentials guide as handwriting practice: sentence patterns, structures, and parts."
        cta="Open Tracing" onClick={() => onSelectTool('tracing')} />
    </div>
    <EssentialsExtras />
  </div>
);
