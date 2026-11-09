import React, { useRef, useState } from 'react';
import { Palette, Printer } from 'lucide-react';
import { printWorksheetPages } from '../utils/printHelper';

/**
 * Fine Arts (Foundations)
 * Week-by-week companion to the guide's Fine Arts strand:
 * drawing-skill weeks get a practice sheet with a big drawing box;
 * Great Artists weeks get an artist study with a public-domain portrait
 * (where one exists) and kid-level facts; composer weeks get a listening sheet.
 * Topics come from Melanie's guide pages; facts are universal knowledge
 * authored for this app. No curriculum lesson content is reproduced.
 */

type WeekKind = 'skill' | 'artist' | 'composer' | 'guide';

interface FineArtsWeek {
  week: number;
  topic: string;
  kind: WeekKind;
  name?: string; // artist/composer name for tracing
  img?: string; // public-domain portrait in /images/arts
  imgCredit?: string;
  facts?: string[]; // universal facts, authored for this app
  listen?: string; // the piece for composer weeks
}

const WEEKS: FineArtsWeek[] = [
  { week: 1, topic: 'Drawing Introduction & Five Elements of Shape', kind: 'skill' },
  { week: 2, topic: 'Mirror Images', kind: 'skill' },
  { week: 3, topic: 'Upside-down Image', kind: 'skill' },
  { week: 4, topic: 'Abstract Art', kind: 'skill' },
  { week: 5, topic: 'Perspective', kind: 'skill' },
  { week: 6, topic: 'Drawing Review and Final Project', kind: 'skill' },
  { week: 7, topic: 'Music Theory Introduction & Parts of the Tin Whistle', kind: 'skill' },
  { week: 8, topic: 'Dynamics', kind: 'skill' },
  { week: 9, topic: 'Note Values and Staff', kind: 'skill' },
  { week: 10, topic: 'Rhythm', kind: 'skill' },
  { week: 11, topic: 'Note Names and the D Scale', kind: 'skill' },
  { week: 12, topic: 'Music Review and Celebration', kind: 'skill' },
  {
    week: 13, topic: 'Great Artists: Grandma Moses', kind: 'artist', name: 'Grandma Moses',
    facts: [
      'Her real name was Anna Mary Robertson Moses.',
      'She began painting seriously in her seventies, after a life of farm work.',
      'She painted cheerful scenes of country life: sugaring, harvests, and snowy villages.',
      'Museums collected her work while she was still alive; she painted past age 100.',
    ],
  },
  {
    week: 14, topic: 'Great Artists: Pablo Picasso', kind: 'artist', name: 'Pablo Picasso',
    facts: [
      'A Spanish artist who spent most of his life working in France.',
      'He helped invent Cubism: building pictures out of shapes seen from many sides at once.',
      'He worked in periods named for colors: the Blue Period, then the Rose Period.',
      'He made paintings, sculptures, prints, and pottery: tens of thousands of works.',
    ],
  },
  {
    week: 15, topic: "Great Artists: Georgia O'Keeffe", kind: 'artist', name: "Georgia O'Keeffe",
    img: '/images/arts/okeeffe.jpg', imgCredit: 'Photograph by Alfred Stieglitz, 1918 (public domain)',
    facts: [
      'An American painter called the Mother of American Modernism.',
      'She painted flowers so large you have to stop and really look at them.',
      'She loved the New Mexico desert and painted its hills, skulls, and skies.',
      'She said she wanted to paint what she felt, not just what she saw.',
    ],
  },
  {
    week: 16, topic: 'Great Artists: Norman Rockwell', kind: 'artist', name: 'Norman Rockwell',
    img: '/images/arts/rockwell.jpg', imgCredit: 'Photograph, Library of Congress (public domain)',
    facts: [
      'An American illustrator who painted everyday American life.',
      'His pictures appeared on magazine covers for almost fifty years.',
      'He painted with warmth and humor: barbershops, ball games, and family dinners.',
      'He planned each painting like a story, posing friends and neighbors as models.',
    ],
  },
  {
    week: 17, topic: 'Great Artists: Andrew Wyeth', kind: 'artist', name: 'Andrew Wyeth',
    facts: [
      'An American painter of quiet, realistic scenes.',
      'He painted the people and windswept places of Pennsylvania and Maine.',
      'He worked mostly in watercolor and egg tempera, an old and careful method.',
      'His most famous painting shows a girl in a wide field looking toward a farmhouse.',
    ],
  },
  {
    week: 18, topic: 'Great Artists: Roy Lichtenstein', kind: 'artist', name: 'Roy Lichtenstein',
    facts: [
      'An American Pop artist.',
      'He painted huge pictures that look like comic-strip panels, dots and all.',
      'Those dots copy the way printers made pictures in old newspapers.',
      'He asked a playful question: can an everyday comic be fine art?',
    ],
  },
  { week: 19, topic: 'Composers Introduction: Romantic & Modern Periods', kind: 'skill' },
  {
    week: 20, topic: 'Composer Study: Tchaikovsky', kind: 'composer', name: 'Pyotr Ilyich Tchaikovsky',
    img: '/images/arts/tchaikovsky.jpg', imgCredit: 'Portrait by Nikolai Kuznetsov, 1893 (public domain)',
    listen: 'Symphony No. 6',
    facts: [
      'A Russian composer of the Romantic period.',
      'He wrote the ballets Swan Lake, The Sleeping Beauty, and The Nutcracker.',
      'His music swings between great joy and deep sadness, often in one piece.',
    ],
  },
  {
    week: 21, topic: 'Composer Study: Debussy', kind: 'composer', name: 'Claude Debussy',
    img: '/images/arts/debussy.jpg', imgCredit: 'Photograph by Nadar, 1908 (public domain)',
    listen: 'La Mer',
    facts: [
      'A French composer who painted pictures with sound.',
      'La Mer means The Sea: you can hear waves, wind, and sunlight on water.',
      'People call his style Impressionism, like the painters of his time.',
    ],
  },
  {
    week: 22, topic: 'Composer Study: Stravinsky', kind: 'composer', name: 'Igor Stravinsky',
    img: '/images/arts/stravinsky.jpg', imgCredit: 'Photograph, Library of Congress (public domain)',
    listen: 'The Rite of Spring',
    facts: [
      'A Russian composer who changed modern music.',
      'The Rite of Spring was so wild and new that its first audience rioted.',
      'He loved surprising rhythms that make you lose count on purpose.',
    ],
  },
  { week: 23, topic: 'Orchestra Overview', kind: 'guide' },
  { week: 24, topic: 'Orchestra Review and Celebration', kind: 'guide' },
];

const PAGE_W = 816;

export const FineArtsTool: React.FC = () => {
  const [week, setWeek] = useState(13);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const data = WEEKS.find((w) => w.week === week)!;

  const handlePrint = () => {
    const pagesHtml = pageRefs.current.filter(Boolean).map((el) => el!.innerHTML);
    printWorksheetPages({ pagesHtml, docTitle: `Fine Arts Week ${week}` });
  };

  const footer = (
    <div className="text-center text-[10px] text-[#7C8880] mt-8 pt-3 border-t border-[#E4EDE7]">
      Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 pb-16">
      <div className="flex items-center justify-between py-4">
        <h2 className="text-xl font-extrabold text-[#2E2B26] flex items-center gap-2">
          <Palette className="w-5 h-5 text-[#2F5D50]" /> Fine Arts
        </h2>
        <button type="button" onClick={handlePrint}
          className="px-4 py-2 bg-[#2F5D50] hover:bg-[#24493e] text-white text-sm font-bold rounded-lg flex items-center gap-1.5 cursor-pointer">
          <Printer className="w-4 h-4" /> Print
        </button>
      </div>

      <div className="grid md:grid-cols-[280px_1fr] gap-5 items-start">
        <div className="bg-white border border-[#D5DED8] rounded-xl p-4 space-y-3 no-print">
          <label className="block text-xs font-bold text-[#2E2B26]">
            Week
            <select value={week} onChange={(e) => setWeek(Number(e.target.value))}
              className="mt-1 w-full text-xs border border-[#C2CFC6] rounded p-1.5">
              {WEEKS.map((w) => <option key={w.week} value={w.week}>Week {w.week}: {w.topic}</option>)}
            </select>
          </label>
          <p className="text-[11px] text-[#5C6B62]">
            Drawing weeks print a practice sheet with a big drawing box. Artist and composer weeks
            print a study page: portrait (where a public-domain one exists), facts, name copywork,
            and lines for what your student noticed.
          </p>
        </div>

        <div className="space-y-6">
          <div ref={(el) => { pageRefs.current[0] = el; }}
            className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
            style={{ width: PAGE_W, minHeight: 1056, padding: '40px 48px' }}>
            <div className="flex items-end justify-between border-b-2 border-[#2E2B26] pb-2 mb-4">
              <div>
                <div className="text-lg font-extrabold text-[#2E2B26]">Fine Arts · Week {data.week}</div>
                <div className="text-[10px] text-[#7C8880]">{data.topic}</div>
              </div>
              <div className="text-xs text-[#44514A]">Name: ____________________ &nbsp; Date: ________</div>
            </div>

            {(data.kind === 'skill' || data.kind === 'guide') && (
              <>
                <p className="text-[13px] text-[#44514A] mb-3">
                  This week's lesson, <span className="font-bold">{data.topic}</span>, is taught from your
                  Foundations guide. After the lesson, practice here:
                </p>
                <div className="border-2 border-[#2E2B26] rounded-md" style={{ height: 640 }}></div>
                <div className="mt-4 text-[13px] text-[#2E2B26]">
                  One thing I learned today: <span className="inline-block border-b-2 border-[#2E2B26] w-[430px] h-5 align-bottom"></span>
                </div>
              </>
            )}

            {(data.kind === 'artist' || data.kind === 'composer') && (
              <>
                <div className="flex gap-6 mb-4">
                  {data.img && (
                    <div className="shrink-0 w-[180px]">
                      <img src={data.img} alt={data.name} className="w-full border border-[#D5DED8] rounded-sm" />
                      <div className="text-[8px] text-[#7C8880] mt-1 leading-tight">{data.imgCredit}</div>
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-[22px] font-extrabold text-[#2E2B26]" style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                      {data.name}
                    </div>
                    {data.listen && (
                      <div className="text-[13px] text-[#2F5D50] font-bold mt-0.5 mb-2">
                        This week's listening: {data.listen}
                      </div>
                    )}
                    <ul className="list-disc pl-5 space-y-1.5 text-[13px] text-[#2E2B26] mt-2">
                      {data.facts?.map((f, i) => <li key={i}>{f}</li>)}
                    </ul>
                  </div>
                </div>

                <div className="mt-5">
                  <div className="text-[11px] font-bold text-[#2F5D50] mb-1">Copy the name:</div>
                  <div className="text-[30px] text-[#B8B2A8] border-b-2 border-[#2E2B26] pb-1"
                    style={{ fontFamily: "'Josefin Sans', sans-serif" }}>
                    {data.name}
                  </div>
                  <div className="border-b-2 border-[#2E2B26] h-12"></div>
                </div>

                <div className="mt-6">
                  <div className="text-[11px] font-bold text-[#2F5D50] mb-1">
                    {data.kind === 'composer'
                      ? 'Listen to the piece. What did you hear? What did it make you picture?'
                      : "Look at this artist's work in your guide or at the library. What did you notice?"}
                  </div>
                  {[0, 1, 2, 3].map((i) => <div key={i} className="border-b-2 border-[#2E2B26] h-9"></div>)}
                </div>

                {data.kind === 'artist' && !data.img && (
                  <p className="text-[10px] text-[#7C8880] mt-4 italic">
                    This artist's photographs and paintings are still under copyright, so this page carries facts
                    instead of pictures. See the real works in your guide or at the library!
                  </p>
                )}
              </>
            )}
            {footer}
          </div>
        </div>
      </div>
    </div>
  );
};
