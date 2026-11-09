import React, { useRef, useState } from 'react';
import { HeartPulse, Printer } from 'lucide-react';
import { printWorksheetPages } from '../utils/printHelper';

/**
 * Body Systems (Foundations · Science)
 * Full-body anatomy reference pages: skeletal, muscular, nervous, lymphatic,
 * digestive, and urinary systems, plus close-up plates (skull, heart & lungs).
 * Every diagram is public domain (Wikimedia Commons / U.S. National Institutes
 * of Health); every "What it does" note is universal knowledge authored for
 * this app. No curriculum content is reproduced.
 */

interface PartNote {
  term: string;
  note: string;
}

interface SystemPage {
  key: string;
  title: string;
  img: string;
  credit: string;
  intro: string;
  parts: PartNote[];
  partsHeading?: string;
  extraNote?: string;
  imgMaxH: number; // px, keeps each page to one printed sheet
}

const SYSTEMS: SystemPage[] = [
  {
    key: 'skeletal',
    title: 'The Skeletal System',
    img: '/images/anatomy/skeletal-system.png',
    credit: 'Diagram: public domain (Wikimedia Commons, Mariana Ruiz Villarreal).',
    intro:
      'Your skeleton is the frame that holds your body up. Adults have 206 bones. Bones protect your soft parts, store minerals, and give your muscles something to pull on so you can move.',
    imgMaxH: 540,
    parts: [
      { term: 'Skull', note: 'Protects the brain.' },
      { term: 'Ribs', note: 'Protect the heart and lungs like a cage.' },
      { term: 'Spinal column', note: 'A stack of small bones that guards the spinal cord and lets you bend.' },
      { term: 'Humerus, radius & ulna', note: 'Upper arm and the two forearm bones.' },
      { term: 'Pelvic girdle', note: 'The hip bones: they connect your legs to your spine.' },
      { term: 'Femur', note: 'The thigh bone: the longest, strongest bone in the body.' },
      { term: 'Patella', note: 'The kneecap: a shield for the knee joint.' },
      { term: 'Tibia & fibula', note: 'The two lower-leg bones between knee and ankle.' },
      { term: 'Carpals, metacarpals & phalanges', note: 'Wrist, hand, and finger bones.' },
      { term: 'Tarsals & metatarsals', note: 'Ankle and foot bones: they carry all your weight.' },
    ],
  },
  {
    key: 'muscular',
    title: 'The Muscular System',
    img: '/images/anatomy/muscular-system.png',
    credit: 'Diagram after Julien Bouglé, 1899: public domain (Wikimedia Commons).',
    intro:
      'You have about 600 muscles. Skeletal muscles work in pairs: one pulls while its partner relaxes. Muscles move your bones, pump your blood, and even make you smile.',
    partsHeading: 'Key muscles and what they do',
    imgMaxH: 500,
    parts: [
      { term: 'Deltoid', note: 'The shoulder muscle: lifts your arm.' },
      { term: 'Pectorals', note: 'Chest muscles that swing your arms forward.' },
      { term: 'Biceps', note: 'Front of the upper arm: bends the elbow.' },
      { term: 'Triceps', note: 'Back of the upper arm: straightens the elbow.' },
      { term: 'Abdominals', note: 'Belly muscles that bend your body and protect your organs.' },
      { term: 'Quadriceps', note: 'Front of the thigh: straightens the knee.' },
      { term: 'Hamstrings', note: 'Back of the thigh: bends the knee.' },
      { term: 'Gastrocnemius', note: 'The calf: lifts your heel so you can walk, run, and jump.' },
      { term: 'Cardiac muscle', note: 'The heart itself: the one muscle that never rests.' },
    ],
  },
  {
    key: 'nervous',
    title: 'The Nervous System',
    img: '/images/anatomy/nervous-system.png',
    credit: 'Diagram: public domain (Wikimedia Commons, Mariana Ruiz Villarreal).',
    intro:
      'The nervous system is your body’s messaging network. The brain sends and receives signals through the spinal cord and nerves faster than you can blink.',
    imgMaxH: 560,
    parts: [
      { term: 'Brain', note: 'The control center: thinking, memory, and commands.' },
      { term: 'Cerebellum', note: 'The back of the brain: balance and coordination.' },
      { term: 'Spinal cord', note: 'The main message highway, protected inside your backbone.' },
      { term: 'Nerves', note: 'Living wires that carry messages to and from every part of you.' },
      { term: 'Sciatic nerve', note: 'The longest nerve: from your lower back down each leg.' },
    ],
  },
  {
    key: 'lymphatic',
    title: 'The Lymphatic System',
    img: '/images/anatomy/lymphatic-system.png',
    credit: 'Diagram: public domain (U.S. National Cancer Institute, SEER Training).',
    intro:
      'The lymphatic system helps your body fight germs. A clear fluid called lymph drains out of your tissues, gets filtered in lymph nodes, and returns clean to the blood.',
    imgMaxH: 560,
    parts: [
      { term: 'Lymph nodes', note: 'Small filters that trap germs. They swell when fighting infection.' },
      { term: 'Lymph vessels', note: 'Tubes that carry lymph all through the body.' },
      { term: 'Spleen', note: 'Filters blood and helps fight infection.' },
      { term: 'Thymus', note: 'Trains germ-fighting cells while you are young.' },
      { term: 'Tonsils', note: 'Stand guard at the entrance to your throat.' },
    ],
  },
  {
    key: 'digestive',
    title: 'The Digestive System',
    img: '/images/anatomy/digestive-system.png',
    credit: 'Diagram: public domain (Wikimedia Commons, Mariana Ruiz Villarreal).',
    intro:
      'The digestive system turns food into fuel. From mouth to end, the whole path is about 30 feet long: a journey that takes a meal one to three days.',
    imgMaxH: 520,
    parts: [
      { term: 'Stomach', note: 'Churns food and mixes it with acid.' },
      { term: 'Liver', note: 'Makes bile and cleans the blood: your largest inside organ.' },
      { term: 'Gallbladder', note: 'Stores bile and squeezes it out to help digest fats.' },
      { term: 'Pancreas', note: 'Makes juices that break down food and controls blood sugar.' },
      { term: 'Small intestine', note: 'Where most of your food is absorbed into the blood.' },
      { term: 'Large intestine', note: 'Takes water back and carries away the waste.' },
    ],
  },
  {
    key: 'urinary',
    title: 'The Urinary System',
    img: '/images/anatomy/urinary-system.png',
    credit: 'Diagram: public domain (Wikimedia Commons, Mariana Ruiz Villarreal).',
    intro:
      'The urinary system is the body’s water-cleaning plant. Your two kidneys filter all of your blood many times every day.',
    partsHeading: 'Match the numbers on the diagram',
    extraNote:
      'Numbers 8–11 on the diagram are blood vessels; 12–14 show the liver, large intestine, and pelvis so you can see where everything sits.',
    imgMaxH: 500,
    parts: [
      { term: '2 · Kidney', note: 'Filters waste and extra water out of the blood.' },
      { term: '3 · Renal pelvis', note: 'Where urine collects inside the kidney.' },
      { term: '4 · Ureter', note: 'The tube that carries urine down to the bladder.' },
      { term: '5 · Bladder', note: 'A stretchy bag that stores urine.' },
      { term: '6 · Urethra', note: 'The tube urine leaves the body through.' },
      { term: '7 · Adrenal gland', note: 'Sits on top of each kidney and makes adrenaline.' },
    ],
  },
  {
    key: 'skull',
    title: 'Close-up: The Skull',
    img: '/images/anatomy/skull.png',
    credit: 'Plate: public domain (Wikimedia Commons).',
    intro:
      'The skull is really 22 bones joined at wavy seams called sutures. Only one of them moves: the mandible, your jaw.',
    imgMaxH: 560,
    parts: [
      { term: 'Cranium', note: 'The rounded case that protects the brain.' },
      { term: 'Mandible', note: 'The jawbone: the only skull bone that moves.' },
      { term: 'Sutures', note: 'The wavy joints where skull bones knit together.' },
      { term: 'Orbits', note: 'The bony sockets that hold and protect your eyes.' },
    ],
  },
  {
    key: 'heartlungs',
    title: 'Close-up: Heart & Lungs',
    img: '/images/anatomy/heart-lungs.png',
    credit: 'Plate: public domain (Wikimedia Commons).',
    intro:
      'Your heart beats about 100,000 times a day, pumping blood to your lungs to pick up oxygen and then out to your whole body.',
    imgMaxH: 560,
    parts: [
      { term: 'Heart', note: 'A muscle pump the size of your fist.' },
      { term: 'Lungs', note: 'Two spongy organs that take in oxygen and let out carbon dioxide.' },
      { term: 'Trachea', note: 'The windpipe: carries air down toward the lungs.' },
      { term: 'Diaphragm', note: 'The flat muscle under the lungs that does the breathing.' },
    ],
  },
];

const PAGE_W = 816;

export const AnatomyTool: React.FC = () => {
  const [selected, setSelected] = useState<Record<string, boolean>>(
    Object.fromEntries(SYSTEMS.map((s) => [s.key, s.key !== 'skull' && s.key !== 'heartlungs']))
  );
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const chosen = SYSTEMS.filter((s) => selected[s.key]);

  const handlePrint = () => {
    const pagesHtml = pageRefs.current.filter(Boolean).map((el) => el!.innerHTML);
    printWorksheetPages({ pagesHtml, docTitle: 'Body Systems' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-[#2F5D50]">
        <HeartPulse className="w-6 h-6" />
        <h2 className="text-2xl font-extrabold text-[#2E2B26]">Body Systems</h2>
      </div>
      <p className="text-sm text-[#5C6B62] mt-1 mb-5 max-w-2xl">
        Full-body anatomy pages for the Cycle 3 science weeks: a labeled public-domain
        diagram with kid-level &ldquo;what it does&rdquo; notes. Check the systems you
        want, then print. One page per system.
      </p>

      {/* System picker */}
      <div className="bg-white border border-[#D5DED8] rounded-xl p-4 mb-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        {SYSTEMS.map((s) => (
          <label key={s.key} className="flex items-center gap-1.5 text-sm text-[#44514A] cursor-pointer">
            <input
              type="checkbox"
              checked={!!selected[s.key]}
              onChange={() => setSelected((p) => ({ ...p, [s.key]: !p[s.key] }))}
              className="accent-[#2F5D50]"
            />
            {s.title.replace('The ', '').replace('Close-up: ', '')}
          </label>
        ))}
        <button
          type="button"
          onClick={handlePrint}
          disabled={chosen.length === 0}
          className="ml-auto inline-flex items-center gap-1.5 bg-[#2F5D50] hover:bg-[#24493e] disabled:opacity-40 text-white text-xs font-bold px-3.5 py-2 rounded-lg cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          {chosen.length === 0 ? 'Check the systems you want' : `Print ${chosen.length} page${chosen.length > 1 ? 's' : ''}`}
        </button>
      </div>

      {/* Pages */}
      <div className="space-y-6">
        {chosen.map((s, i) => (
          <div
            key={s.key}
            ref={(el) => { pageRefs.current[i] = el; }}
            className="print-page bg-white rounded-xl shadow-xs border border-[#E4EDE7] mx-auto"
            style={{ width: PAGE_W, minHeight: 1056, padding: '36px 44px' }}
          >
            <div className="flex items-baseline justify-between border-b-2 border-[#1C3B32] pb-2">
              <h3 className="text-xl font-extrabold text-[#1C3B32]">{s.title}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wide text-[#7C8880]">
                Science &middot; Body Systems
              </span>
            </div>

            <p className="text-[12px] leading-snug text-[#44514A] mt-3">{s.intro}</p>

            <div className="flex justify-center my-3">
              <img
                src={s.img}
                alt={s.title}
                style={{ maxHeight: s.imgMaxH, maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            <div className="text-[11px] font-bold uppercase tracking-wide text-[#2F5D50] mb-1.5">
              {s.partsHeading ?? 'What each part does'}
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
              {s.parts.map((p) => (
                <div key={p.term} className="text-[10.5px] leading-snug text-[#5C6B62]">
                  <span className="font-bold text-[#1C3B32]">{p.term}: </span>
                  <span className="italic">{p.note}</span>
                </div>
              ))}
            </div>
            {s.extraNote && (
              <p className="text-[9.5px] italic text-[#7C8880] mt-2">{s.extraNote}</p>
            )}

            <div className="mt-4 pt-2 border-t border-[#E4EDE7] flex justify-between text-[8.5px] text-[#7C8880]">
              <span>{s.credit}</span>
              <span>Made by Melanie F., a CC Parent. Not affiliated with Classical Conversations.</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
