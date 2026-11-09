// "What it does" notes for Cycle 3 Science list-weeks.
// Verified kid-level facts written by Melanie + Claude (Nov 2026).
// Sentence-style weeks (11, 13, 14, 19, 20, 21, 22, 24) intentionally have no notes:
// their guide answers already explain themselves.

export interface ScienceFunctionNote {
  term: string;
  note: string;
}

export const CYCLE_3_SCIENCE_FUNCTIONS: Record<number, ScienceFunctionNote[]> = {
  1: [
    { term: 'Connective', note: 'Connects, supports, and holds body parts together.' },
    { term: 'Epithelial', note: 'Covers and protects the body, inside and out, like your skin.' },
    { term: 'Muscle', note: 'Tightens and relaxes to move the body.' },
    { term: 'Nerve', note: 'Carries messages between the brain and body.' },
  ],
  2: [
    { term: 'Skull', note: 'Protects the brain.' },
    { term: 'Vertebrae', note: 'The backbone; protects the spinal cord and holds you upright.' },
    { term: 'Ribs', note: 'Protect the heart and lungs.' },
    { term: 'Sternum', note: 'The breastbone; anchors the ribs and shields the heart.' },
  ],
  3: [
    { term: 'Skeletal', note: 'Moves your bones; you control it.' },
    { term: 'Smooth', note: 'Works organs like the stomach; moves on its own.' },
    { term: 'Cardiac', note: 'The heart muscle; pumps blood nonstop.' },
  ],
  4: [
    { term: 'Brain', note: 'The control center; it thinks and sends commands.' },
    { term: 'Spinal cord', note: 'The message highway between brain and body.' },
    { term: 'Nerves', note: 'Carry messages to and from every body part.' },
  ],
  5: [
    { term: 'Sight', note: 'Eyes gather light so you can see.' },
    { term: 'Hearing', note: 'Ears catch sound waves.' },
    { term: 'Taste', note: "The tongue's taste buds sense flavors." },
    { term: 'Smell', note: 'The nose senses odors in the air.' },
    { term: 'Touch', note: 'Skin feels pressure, heat, and pain.' },
  ],
  6: [
    { term: 'Mouth', note: 'Chews food and starts digestion with saliva.' },
    { term: 'Esophagus', note: 'Squeezes food down to the stomach.' },
    { term: 'Stomach', note: 'Churns food and breaks it down with acid.' },
    { term: 'Liver', note: 'Makes bile to help break down fats.' },
    { term: 'Small intestine', note: 'Absorbs nutrients from food into the blood.' },
    { term: 'Large intestine', note: 'Absorbs water and carries out what is left.' },
  ],
  7: [
    { term: 'Urinary tract', note: 'Removes liquid waste as urine.' },
    { term: 'Lungs', note: 'Breathe out carbon dioxide.' },
    { term: 'Skin', note: 'Sweats out waste and salt.' },
    { term: 'Intestines', note: 'Carry solid waste out of the body.' },
  ],
  8: [
    { term: 'Heart', note: 'Pumps blood through the whole body.' },
    { term: 'Arteries', note: 'Carry blood away from the heart.' },
    { term: 'Veins', note: 'Carry blood back to the heart.' },
    { term: 'Capillaries', note: 'Tiny vessels where blood trades oxygen with the cells.' },
    { term: 'Red and white blood cells', note: 'Red cells carry oxygen; white cells fight germs.' },
    { term: 'Platelets', note: 'Clump together to stop bleeding.' },
  ],
  9: [
    { term: 'Lymph vessels', note: 'Carry lymph fluid through the body.' },
    { term: 'Lymph nodes', note: 'Filter germs out of the lymph.' },
    { term: 'Spleen', note: 'Filters blood and helps fight infection.' },
    { term: 'Thymus', note: 'Trains white blood cells to fight germs.' },
  ],
  10: [
    { term: 'Nose', note: 'Warms and cleans the air you breathe.' },
    { term: 'Pharynx', note: 'The throat; a passageway for air and food.' },
    { term: 'Larynx', note: 'The voice box; makes your voice.' },
    { term: 'Trachea', note: 'The windpipe; carries air toward the lungs.' },
    { term: 'Bronchi', note: 'Two tubes carrying air into each lung.' },
    { term: 'Bronchioles', note: 'Smaller branches spreading air through the lungs.' },
    { term: 'Alveoli', note: 'Tiny air sacs where oxygen enters the blood.' },
    { term: 'Lungs', note: 'Take in oxygen and push out carbon dioxide.' },
  ],
  12: [
    { term: 'Transportation', note: 'Carries oxygen, nutrients, and waste around the body.' },
    { term: 'Protection', note: 'Fights germs and seals cuts.' },
    { term: 'Communication', note: 'Carries hormone messages between organs.' },
    { term: 'Regulation', note: 'Keeps body temperature and balance steady.' },
  ],
  15: [
    { term: 'Nucleus', note: "The atom's center, holding protons and neutrons." },
    { term: 'Protons', note: 'Carry a positive charge.' },
    { term: 'Electrons', note: 'Carry a negative charge and orbit the nucleus.' },
    { term: 'Quarks', note: 'Tiny particles that build protons and neutrons.' },
    { term: 'Leptons', note: 'A family of tiny particles; the electron is one.' },
    { term: 'Neutrons', note: 'Carry no charge and sit in the nucleus.' },
  ],
  16: [
    { term: 'Hydrogen', note: 'The lightest element; it fuels the sun.' },
    { term: 'Helium', note: 'Lighter than air; it fills balloons.' },
    { term: 'Lithium', note: 'A soft metal used in batteries.' },
    { term: 'Beryllium', note: 'A strong, light metal used in spacecraft.' },
  ],
  17: [
    { term: 'Boron', note: 'Strengthens glass and ceramics.' },
    { term: 'Carbon', note: 'The building block of all living things.' },
    { term: 'Nitrogen', note: 'Makes up most of the air we breathe.' },
    { term: 'Oxygen', note: 'The part of air our bodies need to live.' },
  ],
  18: [
    { term: 'Fluorine', note: 'Added to toothpaste to protect teeth.' },
    { term: 'Neon', note: 'Glows bright in signs.' },
    { term: 'Sodium', note: 'Half of table salt.' },
    { term: 'Magnesium', note: 'Burns bright white; found in green plants.' },
  ],
  23: [
    { term: 'Rocks', note: 'Layers stack up over time like pages in a book.' },
    { term: 'Fossils', note: 'Preserved remains or prints of living things.' },
    { term: 'Ice', note: 'Traps ancient air and remains in deep freeze.' },
    { term: 'Tar', note: 'Sticky pits trap and preserve animal bones.' },
    { term: 'Amber', note: 'Hardened tree sap that traps insects.' },
  ],
};

export function getScienceFunctionNotes(
  cycle: number,
  week: number
): ScienceFunctionNote[] | undefined {
  if (cycle !== 3) return undefined;
  return CYCLE_3_SCIENCE_FUNCTIONS[week];
}
