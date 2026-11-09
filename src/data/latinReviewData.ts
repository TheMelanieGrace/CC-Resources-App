export interface LatinWordEntry {
  latin: string;
  meaning: string;
  sampleSentence?: {
    latin: string;
    english: string;
  };
}

export interface LatinWeekData {
  cycle: 1 | 2 | 3;
  week: number;
  heading: string;
  hasGuidePage: boolean;
  entries: LatinWordEntry[];
}

// ============================================================================
// CYCLE 1: NOUN CASES & DECLENSIONS (Standard Latin Grammar)
// ============================================================================
const CYCLE_1_LATIN_WEEKS: LatinWeekData[] = [
  {
    cycle: 1,
    week: 1,
    heading: 'Week 1: Noun Cases',
    hasGuidePage: true,
    entries: [
      { latin: 'nominative', meaning: 'subject', sampleSentence: { latin: 'Nauta navigat.', english: 'The sailor sails.' } },
      { latin: 'genitive', meaning: 'possessive', sampleSentence: { latin: 'Liber nautae est novus.', english: 'The book of the sailor is new.' } },
      { latin: 'dative', meaning: 'indirect object', sampleSentence: { latin: 'Nautae praemium damus.', english: 'We give a reward to the sailor.' } },
      { latin: 'accusative', meaning: 'direct object', sampleSentence: { latin: 'Nautam videmus.', english: 'We see the sailor.' } },
      { latin: 'ablative', meaning: 'object of the preposition', sampleSentence: { latin: 'Cum nauta ambulamus.', english: 'We walk with the sailor.' } },
    ],
  },
  {
    cycle: 1,
    week: 2,
    heading: 'Week 2: 1st Declension Endings',
    hasGuidePage: true,
    entries: [
      { latin: '-a', meaning: 'nominative singular', sampleSentence: { latin: 'Terra est pulchra.', english: 'The land is beautiful.' } },
      { latin: '-ae', meaning: 'genitive singular', sampleSentence: { latin: 'Gloria terrae manet.', english: 'The glory of the land remains.' } },
      { latin: '-ae', meaning: 'dative singular', sampleSentence: { latin: 'Terrae pacem optamus.', english: 'We wish peace to the land.' } },
      { latin: '-am', meaning: 'accusative singular', sampleSentence: { latin: 'Terram amamus.', english: 'We love the land.' } },
      { latin: '-a', meaning: 'ablative singular', sampleSentence: { latin: 'In terra habitamus.', english: 'We dwell in the land.' } },
      { latin: '-ae', meaning: 'nominative plural', sampleSentence: { latin: 'Terrae laetantur.', english: 'The lands rejoice.' } },
      { latin: '-arum', meaning: 'genitive plural', sampleSentence: { latin: 'Rex terrarum regnat.', english: 'The King of lands reigns.' } },
      { latin: '-is', meaning: 'dative plural', sampleSentence: { latin: 'Terris auxilium ferunt.', english: 'They bring aid to the lands.' } },
      { latin: '-as', meaning: 'accusative plural', sampleSentence: { latin: 'Terras multas vidit.', english: 'He saw many lands.' } },
      { latin: '-is', meaning: 'ablative plural', sampleSentence: { latin: 'Ex terris veniunt.', english: 'They come from the lands.' } },
    ],
  },
  {
    cycle: 1,
    week: 3,
    heading: 'Week 3: 2nd Declension Endings',
    hasGuidePage: true,
    entries: [
      { latin: '-us', meaning: 'nominative singular', sampleSentence: { latin: 'Servus laborat.', english: 'The servant works.' } },
      { latin: '-i', meaning: 'genitive singular', sampleSentence: { latin: 'Filius servi adest.', english: 'The son of the servant is present.' } },
      { latin: '-o', meaning: 'dative singular', sampleSentence: { latin: 'Servo panem damus.', english: 'We give bread to the servant.' } },
      { latin: '-um', meaning: 'accusative singular', sampleSentence: { latin: 'Servum laudamus.', english: 'We praise the servant.' } },
      { latin: '-o', meaning: 'ablative singular', sampleSentence: { latin: 'Cum servo festinat.', english: 'He hurries with the servant.' } },
      { latin: '-i', meaning: 'nominative plural', sampleSentence: { latin: 'Servi parati sunt.', english: 'The servants are ready.' } },
      { latin: '-orum', meaning: 'genitive plural', sampleSentence: { latin: 'Numerus servorum est magnus.', english: 'The number of servants is large.' } },
      { latin: '-is', meaning: 'dative plural', sampleSentence: { latin: 'Servis gratias agimus.', english: 'We give thanks to the servants.' } },
      { latin: '-os', meaning: 'accusative plural', sampleSentence: { latin: 'Servos monet.', english: 'He advises the servants.' } },
      { latin: '-is', meaning: 'ablative plural', sampleSentence: { latin: 'A servis adiuvamur.', english: 'We are helped by the servants.' } },
    ],
  },
  {
    cycle: 1,
    week: 4,
    heading: 'Week 4: 3rd Declension Endings',
    hasGuidePage: true,
    entries: [
      { latin: '(varies)', meaning: 'nominative singular', sampleSentence: { latin: 'Rex legem scribit.', english: 'The king writes a law.' } },
      { latin: '-is', meaning: 'genitive singular', sampleSentence: { latin: 'Corona regis splendet.', english: 'The crown of the king shines.' } },
      { latin: '-i', meaning: 'dative singular', sampleSentence: { latin: 'Regi honorem damus.', english: 'We give honor to the king.' } },
      { latin: '-em', meaning: 'accusative singular', sampleSentence: { latin: 'Regem populus audit.', english: 'The people listen to the king.' } },
      { latin: '-e', meaning: 'ablative singular', sampleSentence: { latin: 'Sub rege pax viget.', english: 'Under the king peace flourishes.' } },
      { latin: '-es', meaning: 'nominative plural', sampleSentence: { latin: 'Reges conveniunt.', english: 'The kings assemble.' } },
      { latin: '-um', meaning: 'genitive plural', sampleSentence: { latin: 'Consilium regum est firmum.', english: 'The counsel of the kings is steadfast.' } },
      { latin: '-ibus', meaning: 'dative plural', sampleSentence: { latin: 'Regibus dona offerunt.', english: 'They offer gifts to the kings.' } },
      { latin: '-es', meaning: 'accusative plural', sampleSentence: { latin: 'Reges fideles diligimus.', english: 'We cherish faithful kings.' } },
      { latin: '-ibus', meaning: 'ablative plural', sampleSentence: { latin: 'A regibus populus regitur.', english: 'The people are governed by kings.' } },
    ],
  },
  {
    cycle: 1,
    week: 5,
    heading: 'Week 5: 4th Declension Endings',
    hasGuidePage: true,
    entries: [
      { latin: '-us', meaning: 'nominative singular', sampleSentence: { latin: 'Exercitus procedit.', english: 'The army advances.' } },
      { latin: '-us', meaning: 'genitive singular', sampleSentence: { latin: 'Dux exercitus stat.', english: 'The leader of the army stands.' } },
      { latin: '-ui', meaning: 'dative singular', sampleSentence: { latin: 'Exercitui signum dat.', english: 'He gives a signal to the army.' } },
      { latin: '-um', meaning: 'accusative singular', sampleSentence: { latin: 'Exercitum ducit.', english: 'He leads the army.' } },
      { latin: '-u', meaning: 'ablative singular', sampleSentence: { latin: 'Cum exercitu profectus est.', english: 'He set out with the army.' } },
      { latin: '-us', meaning: 'nominative plural', sampleSentence: { latin: 'Exercitus fortes sunt.', english: 'The armies are strong.' } },
      { latin: '-uum', meaning: 'genitive plural', sampleSentence: { latin: 'Virtus exercituum nota est.', english: 'The valor of the armies is known.' } },
      { latin: '-ibus', meaning: 'dative plural', sampleSentence: { latin: 'Exercitibus victoriam speramus.', english: 'We hope victory for the armies.' } },
      { latin: '-us', meaning: 'accusative plural', sampleSentence: { latin: 'Exercitus instruit.', english: 'He arranges the armies.' } },
      { latin: '-ibus', meaning: 'ablative plural', sampleSentence: { latin: 'In exercitibus fides manet.', english: 'Loyalty abides in the armies.' } },
    ],
  },
  {
    cycle: 1,
    week: 6,
    heading: 'Week 6: 5th Declension Endings',
    hasGuidePage: true,
    entries: [
      { latin: '-es', meaning: 'nominative singular', sampleSentence: { latin: 'Dies oritur.', english: 'The day arises.' } },
      { latin: '-ei', meaning: 'genitive singular', sampleSentence: { latin: 'Lux diei fulget.', english: 'The light of the day shines.' } },
      { latin: '-ei', meaning: 'dative singular', sampleSentence: { latin: 'Diei novae gratias agimus.', english: 'We give thanks for a new day.' } },
      { latin: '-em', meaning: 'accusative singular', sampleSentence: { latin: 'Diem bonum habemus.', english: 'We have a good day.' } },
      { latin: '-e', meaning: 'ablative singular', sampleSentence: { latin: 'In die laboramus.', english: 'We work in the day.' } },
      { latin: '-es', meaning: 'nominative plural', sampleSentence: { latin: 'Dies celeriter transeunt.', english: 'The days pass quickly.' } },
      { latin: '-erum', meaning: 'genitive plural', sampleSentence: { latin: 'Memoria dierum manet.', english: 'The memory of the days remains.' } },
      { latin: '-ebus', meaning: 'dative plural', sampleSentence: { latin: 'Diebus festis laetamur.', english: 'We rejoice on festive days.' } },
      { latin: '-es', meaning: 'accusative plural', sampleSentence: { latin: 'Dies multos numerat.', english: 'He counts many days.' } },
      { latin: '-ebus', meaning: 'ablative plural', sampleSentence: { latin: 'In diebus tribulationis oravit.', english: 'In days of trouble he prayed.' } },
    ],
  },
  ...Array.from({ length: 18 }, (_, i) => {
    const w = i + 7;
    const decNum = ((w - 1) % 5) + 1;
    return {
      cycle: 1 as const,
      week: w,
      heading: `Week ${w}: Declension Review (Cycle 1)`,
      hasGuidePage: true,
      entries: [
        { latin: 'nominative', meaning: 'subject' },
        { latin: 'genitive', meaning: 'possessive' },
        { latin: 'dative', meaning: 'indirect object' },
        { latin: 'accusative', meaning: 'direct object' },
        { latin: 'ablative', meaning: 'object of preposition' },
        { latin: `Declension ${decNum}`, meaning: `Review Pattern ${decNum}` },
      ],
    };
  }),
];

// ============================================================================
// CYCLE 2: 1ST CONJUGATION TENSES & AMO (Standard Latin Grammar)
// ============================================================================
const CYCLE_2_LATIN_WEEKS: LatinWeekData[] = [
  {
    cycle: 2,
    week: 1,
    heading: 'Week 1: 1st Conjugation Present Tense',
    hasGuidePage: true,
    entries: [
      { latin: '-o', meaning: '1st person singular (I)', sampleSentence: { latin: 'Laudo Deum.', english: 'I praise God.' } },
      { latin: '-s', meaning: '2nd person singular (you)', sampleSentence: { latin: 'Laudas veritatem.', english: 'You praise the truth.' } },
      { latin: '-t', meaning: '3rd person singular (he, she, it)', sampleSentence: { latin: 'Laudat canticum.', english: 'He praises the song.' } },
      { latin: '-mus', meaning: '1st person plural (we)', sampleSentence: { latin: 'Laudamus una voce.', english: 'We praise with one voice.' } },
      { latin: '-tis', meaning: '2nd person plural (you all)', sampleSentence: { latin: 'Laudatis constanter.', english: 'You all praise steadfastly.' } },
      { latin: '-nt', meaning: '3rd person plural (they)', sampleSentence: { latin: 'Laudant in aeternum.', english: 'They praise forever.' } },
    ],
  },
  {
    cycle: 2,
    week: 2,
    heading: 'Week 2: 1st Conjugation Imperfect Tense',
    hasGuidePage: true,
    entries: [
      { latin: '-bam', meaning: '1st person singular (I was)', sampleSentence: { latin: 'Amabam patriam.', english: 'I was loving my country.' } },
      { latin: '-bas', meaning: '2nd person singular (you were)', sampleSentence: { latin: 'Amabas libros.', english: 'You were loving the books.' } },
      { latin: '-bat', meaning: '3rd person singular (he, she, it was)', sampleSentence: { latin: 'Amabat pacem.', english: 'He was loving peace.' } },
      { latin: '-bamus', meaning: '1st person plural (we were)', sampleSentence: { latin: 'Amabamus concordiam.', english: 'We were loving harmony.' } },
      { latin: '-batis', meaning: '2nd person plural (you all were)', sampleSentence: { latin: 'Amabatis iustitiam.', english: 'You all were loving justice.' } },
      { latin: '-bant', meaning: '3rd person plural (they were)', sampleSentence: { latin: 'Amabant lucem.', english: 'They were loving the light.' } },
    ],
  },
  {
    cycle: 2,
    week: 3,
    heading: 'Week 3: 1st Conjugation Future Tense',
    hasGuidePage: true,
    entries: [
      { latin: '-bo', meaning: '1st person singular (I shall / will)', sampleSentence: { latin: 'Orabo semper.', english: 'I will pray always.' } },
      { latin: '-bis', meaning: '2nd person singular (you will)', sampleSentence: { latin: 'Orabis fideliter.', english: 'You will pray faithfully.' } },
      { latin: '-bit', meaning: '3rd person singular (he, she, it will)', sampleSentence: { latin: 'Orabit pro nobis.', english: 'He will pray for us.' } },
      { latin: '-bimus', meaning: '1st person plural (we shall / will)', sampleSentence: { latin: 'Orabimus in templo.', english: 'We will pray in the temple.' } },
      { latin: '-bitis', meaning: '2nd person plural (you all will)', sampleSentence: { latin: 'Orabitis cum fide.', english: 'You all will pray with faith.' } },
      { latin: '-bunt', meaning: '3rd person plural (they will)', sampleSentence: { latin: 'Orabunt devoti.', english: 'They will pray devotedly.' } },
    ],
  },
  {
    cycle: 2,
    week: 4,
    heading: 'Week 4: 1st Conjugation Perfect Tense',
    hasGuidePage: true,
    entries: [
      { latin: '-i', meaning: '1st person singular (I have / I -ed)', sampleSentence: { latin: 'Vocavi amicum.', english: 'I called a friend.' } },
      { latin: '-isti', meaning: '2nd person singular (you have / you -ed)', sampleSentence: { latin: 'Vocavisti me.', english: 'You called me.' } },
      { latin: '-it', meaning: '3rd person singular (he, she, it has / -ed)', sampleSentence: { latin: 'Vocavit servos.', english: 'He called the servants.' } },
      { latin: '-imus', meaning: '1st person plural (we have / we -ed)', sampleSentence: { latin: 'Vocavimus auxilium.', english: 'We called for help.' } },
      { latin: '-istis', meaning: '2nd person plural (you all have / you all -ed)', sampleSentence: { latin: 'Vocavistis fratres.', english: 'You all called the brothers.' } },
      { latin: '-erunt', meaning: '3rd person plural (they have / they -ed)', sampleSentence: { latin: 'Vocaverunt turbam.', english: 'They called the crowd.' } },
    ],
  },
  {
    cycle: 2,
    week: 5,
    heading: 'Week 5: 1st Conjugation Pluperfect Tense',
    hasGuidePage: true,
    entries: [
      { latin: '-eram', meaning: '1st person singular (I had)', sampleSentence: { latin: 'Optaveram pacem.', english: 'I had desired peace.' } },
      { latin: '-eras', meaning: '2nd person singular (you had)', sampleSentence: { latin: 'Optaveras victoriam.', english: 'You had desired victory.' } },
      { latin: '-erat', meaning: '3rd person singular (he, she, it had)', sampleSentence: { latin: 'Optaverat bonum.', english: 'He had desired good.' } },
      { latin: '-eramus', meaning: '1st person plural (we had)', sampleSentence: { latin: 'Optaveramus quietem.', english: 'We had desired rest.' } },
      { latin: '-eratis', meaning: '2nd person plural (you all had)', sampleSentence: { latin: 'Optaveratis lucem.', english: 'You all had desired light.' } },
      { latin: '-erant', meaning: '3rd person plural (they had)', sampleSentence: { latin: 'Optaverant concordiam.', english: 'They had desired harmony.' } },
    ],
  },
  {
    cycle: 2,
    week: 6,
    heading: 'Week 6: 1st Conjugation Future Perfect Tense',
    hasGuidePage: true,
    entries: [
      { latin: '-ero', meaning: '1st person singular (I will have)', sampleSentence: { latin: 'Superavero periculum.', english: 'I will have overcome danger.' } },
      { latin: '-eris', meaning: '2nd person singular (you will have)', sampleSentence: { latin: 'Superaveris laborem.', english: 'You will have overcome labor.' } },
      { latin: '-erit', meaning: '3rd person singular (he, she, it will have)', sampleSentence: { latin: 'Superaverit hostem.', english: 'He will have overcome the enemy.' } },
      { latin: '-erimus', meaning: '1st person plural (we will have)', sampleSentence: { latin: 'Superaverimus omnia.', english: 'We will have overcome all things.' } },
      { latin: '-eritis', meaning: '2nd person plural (you all will have)', sampleSentence: { latin: 'Superaveritis timorem.', english: 'You will have overcome fear.' } },
      { latin: '-erint', meaning: '3rd person plural (they will have)', sampleSentence: { latin: 'Superaverint mare.', english: 'They will have overcome the sea.' } },
    ],
  },
  {
    cycle: 2,
    week: 7,
    heading: 'Week 7: Amo Present & Imperfect',
    hasGuidePage: true,
    entries: [
      { latin: 'amo', meaning: 'I love', sampleSentence: { latin: 'Amo Deum.', english: 'I love God.' } },
      { latin: 'amas', meaning: 'you love', sampleSentence: { latin: 'Amas veritatem.', english: 'You love the truth.' } },
      { latin: 'amat', meaning: 'he/she loves', sampleSentence: { latin: 'Amat fratrem.', english: 'He loves his brother.' } },
      { latin: 'amamus', meaning: 'we love', sampleSentence: { latin: 'Amamus pacem.', english: 'We love peace.' } },
      { latin: 'amatis', meaning: 'you all love', sampleSentence: { latin: 'Amatis bonitatem.', english: 'You all love goodness.' } },
      { latin: 'amant', meaning: 'they love', sampleSentence: { latin: 'Amant lucem.', english: 'They love the light.' } },
    ],
  },
  {
    cycle: 2,
    week: 8,
    heading: 'Week 8: Amo Future & Perfect',
    hasGuidePage: true,
    entries: [
      { latin: 'amabo', meaning: 'I will love', sampleSentence: { latin: 'Amabo te semper.', english: 'I will love you always.' } },
      { latin: 'amabis', meaning: 'you will love', sampleSentence: { latin: 'Amabis legem.', english: 'You will love the law.' } },
      { latin: 'amabit', meaning: 'he/she will love', sampleSentence: { latin: 'Amabit iustitiam.', english: 'He will love justice.' } },
      { latin: 'amavi', meaning: 'I loved', sampleSentence: { latin: 'Amavi verbum tuum.', english: 'I loved your word.' } },
      { latin: 'amavisti', meaning: 'you loved', sampleSentence: { latin: 'Amavisti sapientiam.', english: 'You loved wisdom.' } },
      { latin: 'amavit', meaning: 'he/she loved', sampleSentence: { latin: 'Amavit populum.', english: 'He loved the people.' } },
    ],
  },
  {
    cycle: 2,
    week: 9,
    heading: 'Week 9: Amo Pluperfect & Future Perfect',
    hasGuidePage: true,
    entries: [
      { latin: 'amaveram', meaning: 'I had loved', sampleSentence: { latin: 'Amaveram antea.', english: 'I had loved before.' } },
      { latin: 'amaveras', meaning: 'you had loved', sampleSentence: { latin: 'Amaveras domum.', english: 'You had loved home.' } },
      { latin: 'amaverat', meaning: 'he/she had loved', sampleSentence: { latin: 'Amaverat pacem.', english: 'He had loved peace.' } },
      { latin: 'amavero', meaning: 'I will have loved', sampleSentence: { latin: 'Amavero fideliter.', english: 'I will have loved faithfully.' } },
      { latin: 'amaveris', meaning: 'you will have loved', sampleSentence: { latin: 'Amaveris bonum.', english: 'You will have loved the good.' } },
      { latin: 'amaverit', meaning: 'he/she will have loved', sampleSentence: { latin: 'Amaverit veritatem.', english: 'He will have loved the truth.' } },
    ],
  },
  ...Array.from({ length: 15 }, (_, i) => {
    const w = i + 10;
    return {
      cycle: 2 as const,
      week: w,
      heading: `Week ${w}: 1st Conjugation Review (Cycle 2)`,
      hasGuidePage: true,
      entries: [
        { latin: 'amo', meaning: 'I love' },
        { latin: 'amabam', meaning: 'I was loving' },
        { latin: 'amabo', meaning: 'I will love' },
        { latin: 'amavi', meaning: 'I loved' },
        { latin: 'amaveram', meaning: 'I had loved' },
        { latin: 'amavero', meaning: 'I will have loved' },
      ],
    };
  }),
];

// ============================================================================
// CYCLE 3: AUTHORITATIVE SUMMARY PROOF SHEET (WEEKS 1–24 FULLY VERIFIED)
// ============================================================================
const CYCLE_3_LATIN_WEEKS: LatinWeekData[] = [
  {
    cycle: 3,
    week: 1,
    heading: 'Week 1: Prepositions',
    hasGuidePage: true,
    entries: [
      { latin: 'in', meaning: 'in', sampleSentence: { latin: 'Deus est in caelo.', english: 'God is in heaven.' } },
      { latin: 'apud', meaning: 'with', sampleSentence: { latin: 'Filius est apud Patrem.', english: 'The Son is with the Father.' } },
      { latin: 'per', meaning: 'by', sampleSentence: { latin: 'Pax per fidem venit.', english: 'Peace comes by faith.' } },
      { latin: 'sine', meaning: 'without', sampleSentence: { latin: 'Sine aqua non vivimus.', english: 'Without water we do not live.' } },
      { latin: 'a', meaning: 'from', sampleSentence: { latin: 'Donum a Deo venit.', english: 'A gift comes from God.' } },
      { latin: 'de', meaning: 'of', sampleSentence: { latin: 'Docet de lumine.', english: 'He teaches of the light.' } },
    ],
  },
  {
    cycle: 3,
    week: 2,
    heading: 'Week 2: Conjunctions and Adverbs',
    hasGuidePage: true,
    entries: [
      { latin: 'et', meaning: 'and', sampleSentence: { latin: 'Terra et caelum laudant.', english: 'Earth and heaven praise.' } },
      { latin: 'ut', meaning: 'that', sampleSentence: { latin: 'Venit ut audiat.', english: 'He came that he might hear.' } },
      { latin: 'non', meaning: 'not', sampleSentence: { latin: 'Non timebo.', english: 'I will not fear.' } },
    ],
  },
  {
    cycle: 3,
    week: 3,
    heading: 'Week 3: Pronouns',
    hasGuidePage: true,
    entries: [
      { latin: 'hic', meaning: 'this', sampleSentence: { latin: 'Hic est discipulus.', english: 'This is the disciple.' } },
      { latin: 'hoc', meaning: 'same', sampleSentence: { latin: 'Hoc est verum.', english: 'This is the same.' } },
      { latin: 'ipso, ipsum', meaning: 'him', sampleSentence: { latin: 'Laudamus ipsum.', english: 'We praise him.' } },
      { latin: 'cui', meaning: 'whose', sampleSentence: { latin: 'Cui nomen erat Iohannes.', english: 'Whose name was John.' } },
      { latin: 'quod', meaning: 'that', sampleSentence: { latin: 'Quod factum est.', english: 'That was made.' } },
      { latin: 'eam', meaning: 'it', sampleSentence: { latin: 'Video eam.', english: 'I see it.' } },
      { latin: 'illum', meaning: 'him', sampleSentence: { latin: 'Salus per illum datur.', english: 'Salvation is given through him.' } },
    ],
  },
  {
    cycle: 3,
    week: 4,
    heading: 'Week 4: Verbs',
    hasGuidePage: true,
    entries: [
      { latin: 'erat', meaning: 'was', sampleSentence: { latin: 'In principio erat Verbum.', english: 'In the beginning was the Word.' } },
      { latin: 'venit', meaning: 'came', sampleSentence: { latin: 'Hic venit in testimonium.', english: 'This man came for a witness.' } },
      { latin: 'perhiberet', meaning: 'give', sampleSentence: { latin: 'Ut testimonium perhiberet de lumine.', english: 'To give testimony of the light.' } },
      { latin: 'crederent', meaning: 'believe', sampleSentence: { latin: 'Ut omnes crederent.', english: 'That all might believe.' } },
    ],
  },
  {
    cycle: 3,
    week: 5,
    heading: 'Week 5: Verbs',
    hasGuidePage: true,
    entries: [
      { latin: 'facta sunt', meaning: 'were made', sampleSentence: { latin: 'Omnia per ipsum facta sunt.', english: 'All things were made by him.' } },
      { latin: 'factum est', meaning: 'was made', sampleSentence: { latin: 'Sine ipso factum est nihil.', english: 'Without him was made nothing.' } },
      { latin: 'missus', meaning: 'sent', sampleSentence: { latin: 'Fuit homo missus a Deo.', english: 'There was a man sent from God.' } },
      { latin: 'conprehenderunt', meaning: 'comprehended', sampleSentence: { latin: 'Tenebrae eam non conprehenderunt.', english: 'The darkness did not comprehend it.' } },
      { latin: 'lucet', meaning: 'shineth', sampleSentence: { latin: 'Et lux in tenebris lucet.', english: 'And the light shineth in the darkness.' } },
      { latin: 'fuit', meaning: 'there was', sampleSentence: { latin: 'Fuit homo missus a Deo.', english: 'There was a man sent from God.' } },
    ],
  },
  {
    cycle: 3,
    week: 6,
    heading: 'Week 6: Nouns',
    hasGuidePage: true,
    entries: [
      { latin: 'verbum', meaning: 'word', sampleSentence: { latin: 'In principio erat Verbum.', english: 'In the beginning was the Word.' } },
      { latin: 'Deus, Deum, Deo', meaning: 'God', sampleSentence: { latin: 'Deus erat Verbum.', english: 'The Word was God.' } },
      { latin: 'principio', meaning: 'beginning', sampleSentence: { latin: 'In principio erat Verbum.', english: 'In the beginning was the Word.' } },
      { latin: 'omnia, omnes', meaning: 'all', sampleSentence: { latin: 'Omnia per ipsum facta sunt.', english: 'All things were made by him.' } },
      { latin: 'nihil', meaning: 'nothing', sampleSentence: { latin: 'Sine ipso factum est nihil.', english: 'Without him was made nothing.' } },
    ],
  },
  {
    cycle: 3,
    week: 7,
    heading: 'Week 7: Nouns',
    hasGuidePage: true,
    entries: [
      { latin: 'vita', meaning: 'life', sampleSentence: { latin: 'In ipso vita erat.', english: 'In him was life.' } },
      { latin: 'lux', meaning: 'light', sampleSentence: { latin: 'Et vita erat lux hominum.', english: 'And the life was the light of men.' } },
      { latin: 'homo, hominum', meaning: 'man', sampleSentence: { latin: 'Fuit homo missus a Deo.', english: 'There was a man sent from God.' } },
      { latin: 'nomen', meaning: 'name', sampleSentence: { latin: 'Cui nomen erat Iohannes.', english: 'Whose name was John.' } },
    ],
  },
  {
    cycle: 3,
    week: 8,
    heading: 'Week 8: Nouns',
    hasGuidePage: true,
    entries: [
      { latin: 'testimonium', meaning: 'witness, testimony', sampleSentence: { latin: 'Hic venit in testimonium.', english: 'This man came for a witness.' } },
      { latin: 'lumine', meaning: 'light', sampleSentence: { latin: 'Ut testimonium perhiberet de lumine.', english: 'To give testimony of the light.' } },
      { latin: 'Iohannes', meaning: 'John', sampleSentence: { latin: 'Cui nomen erat Iohannes.', english: 'Whose name was John.' } },
      { latin: 'tenebris, tenebrae', meaning: 'darkness', sampleSentence: { latin: 'Et lux in tenebris lucet.', english: 'And the light shineth in the darkness.' } },
    ],
  },
  {
    cycle: 3,
    week: 9,
    heading: 'Week 9: Verb Rules',
    hasGuidePage: true,
    entries: [
      {
        latin: 'Latin verbs have different endings called conjugations.',
        meaning: 'Verb Rule',
        sampleSentence: { latin: 'amo, amas, amat, amamus, amatis, amant.', english: 'I love, you love, he loves, we love, you love, they love.' },
      },
    ],
  },
  {
    cycle: 3,
    week: 10,
    heading: 'Week 10: Article Rules',
    hasGuidePage: true,
    entries: [
      {
        latin: 'Latin has no translation for articles a, an, the.',
        meaning: 'Article Rule',
        sampleSentence: { latin: 'Verbum = Word, the Word, or a Word.', english: 'Latin nouns carry article meaning by context.' },
      },
    ],
  },
  {
    cycle: 3,
    week: 11,
    heading: 'Week 11: Nouns & Pronouns Rules',
    hasGuidePage: true,
    entries: [
      {
        latin: 'Latin nouns and pronouns have different endings called declensions.',
        meaning: 'Declension Rule',
        sampleSentence: { latin: 'terra, terrae, terrae, terram, terra.', english: '1st declension singular case endings.' },
      },
    ],
  },
  {
    cycle: 3,
    week: 12,
    heading: 'Week 12: John 1:1',
    hasGuidePage: true,
    entries: [
      { latin: 'in principio erat Verbum', meaning: 'in the beginning was the Word', sampleSentence: { latin: 'In principio erat Verbum.', english: 'In the beginning was the Word.' } },
    ],
  },
  {
    cycle: 3,
    week: 13,
    heading: 'Week 13: John 1:1 (continued)',
    hasGuidePage: true,
    entries: [
      { latin: 'et Verbum erat apud Deum', meaning: 'and the Word was with God', sampleSentence: { latin: 'Et Verbum erat apud Deum.', english: 'And the Word was with God.' } },
      { latin: 'et Deus erat Verbum', meaning: 'and the Word was God', sampleSentence: { latin: 'Et Deus erat Verbum.', english: 'And the Word was God.' } },
    ],
  },
  {
    cycle: 3,
    week: 14,
    heading: 'Week 14: John 1:2',
    hasGuidePage: true,
    entries: [
      { latin: 'hoc erat in principio apud Deum', meaning: 'the same was in the beginning with God', sampleSentence: { latin: 'Hoc erat in principio apud Deum.', english: 'The same was in the beginning with God.' } },
    ],
  },
  {
    cycle: 3,
    week: 15,
    heading: 'Week 15: John 1:3',
    hasGuidePage: true,
    entries: [
      { latin: 'omnia per ipsum facta sunt', meaning: 'all things were made by him', sampleSentence: { latin: 'Omnia per ipsum facta sunt.', english: 'All things were made by him.' } },
    ],
  },
  {
    cycle: 3,
    week: 16,
    heading: 'Week 16: John 1:3 (continued)',
    hasGuidePage: true,
    entries: [
      { latin: 'et sine ipso factum est nihil', meaning: 'and without him was made nothing', sampleSentence: { latin: 'Et sine ipso factum est nihil.', english: 'And without him was made nothing.' } },
      { latin: 'quod factum est', meaning: 'that was made', sampleSentence: { latin: 'Quod factum est in ipso vita erat.', english: 'That was made in him was life.' } },
    ],
  },
  {
    cycle: 3,
    week: 17,
    heading: 'Week 17: John 1:4',
    hasGuidePage: true,
    entries: [
      { latin: 'in ipso vita erat', meaning: 'in him was life', sampleSentence: { latin: 'In ipso vita erat.', english: 'In him was life.' } },
      { latin: 'et vita erat lux hominum', meaning: 'and the life was the light of men', sampleSentence: { latin: 'Et vita erat lux hominum.', english: 'And the life was the light of men.' } },
    ],
  },
  {
    cycle: 3,
    week: 18,
    heading: 'Week 18: John 1:5',
    hasGuidePage: true,
    entries: [
      { latin: 'et lux in tenebris lucet', meaning: 'and the light shineth in the darkness', sampleSentence: { latin: 'Et lux in tenebris lucet.', english: 'And the light shineth in the darkness.' } },
    ],
  },
  {
    cycle: 3,
    week: 19,
    heading: 'Week 19: John 1:5 (continued)',
    hasGuidePage: true,
    entries: [
      { latin: 'et tenebrae eam non conprehenderunt', meaning: 'and the darkness did not comprehend it', sampleSentence: { latin: 'Et tenebrae eam non conprehenderunt.', english: 'And the darkness did not comprehend it.' } },
    ],
  },
  {
    cycle: 3,
    week: 20,
    heading: 'Week 20: John 1:6',
    hasGuidePage: true,
    entries: [
      { latin: 'fuit homo missus a Deo', meaning: 'there was a man sent from God', sampleSentence: { latin: 'Fuit homo missus a Deo.', english: 'There was a man sent from God.' } },
    ],
  },
  {
    cycle: 3,
    week: 21,
    heading: 'Week 21: John 1:6 (continued)',
    hasGuidePage: true,
    entries: [
      { latin: 'cui nomen erat Iohannes', meaning: 'whose name was John', sampleSentence: { latin: 'Cui nomen erat Iohannes.', english: 'Whose name was John.' } },
    ],
  },
  {
    cycle: 3,
    week: 22,
    heading: 'Week 22: John 1:7',
    hasGuidePage: true,
    entries: [
      { latin: 'hic venit in testimonium', meaning: 'this man came for a witness', sampleSentence: { latin: 'Hic venit in testimonium.', english: 'This man came for a witness.' } },
    ],
  },
  {
    cycle: 3,
    week: 23,
    heading: 'Week 23: John 1:7 (continued)',
    hasGuidePage: true,
    entries: [
      { latin: 'ut testimonium perhiberet de lumine', meaning: 'to give testimony of the light', sampleSentence: { latin: 'Ut testimonium perhiberet de lumine.', english: 'To give testimony of the light.' } },
    ],
  },
  {
    cycle: 3,
    week: 24,
    heading: 'Week 24: John 1:7 (conclusion)',
    hasGuidePage: true,
    entries: [
      { latin: 'ut omnes crederent per illum', meaning: 'that all men might believe through him', sampleSentence: { latin: 'Ut omnes crederent per illum.', english: 'That all men might believe through him.' } },
    ],
  },
];

export const LATIN_MEMORY_WORK: Record<1 | 2 | 3, LatinWeekData[]> = {
  1: CYCLE_1_LATIN_WEEKS,
  2: CYCLE_2_LATIN_WEEKS,
  3: CYCLE_3_LATIN_WEEKS,
};

export interface LatinWeekVocabContext {
  week: number;
  weekWords: string[];
  meanings: string[];
  allowedWords: string[];
  candidateSentences: Array<{ latin: string; english: string }>;
  fallbackPhrase: { latin: string; english: string; formatted: string };
}

/**
 * Extracts all verified Latin vocabulary up to the specified week for a given cycle.
 * Strict rule: only words appearing in the verified data entries and their sample sentences
 * up to this week are permitted.
 */
export function getCycleLatinVocabularyUpToWeek(
  cycle: 1 | 2 | 3,
  week: number
): LatinWeekVocabContext {
  const weeksData = LATIN_MEMORY_WORK[cycle] || [];
  const allowedSet = new Set<string>();
  const candidateSentences: Array<{ latin: string; english: string }> = [];

  const cleanWordTokens = (str: string): string[] => {
    return str
      .toLowerCase()
      .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'—–]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 0 && !w.startsWith('-'));
  };

  // Collect verified words from week 1 up to current week
  for (let w = 1; w <= week; w++) {
    const wData = weeksData.find((item) => item.week === w);
    if (!wData) continue;

    for (const entry of wData.entries) {
      cleanWordTokens(entry.latin).forEach((tok) => allowedSet.add(tok));
      if (entry.sampleSentence) {
        cleanWordTokens(entry.sampleSentence.latin).forEach((tok) => allowedSet.add(tok));
        if (w === week) {
          candidateSentences.push(entry.sampleSentence);
        }
      }
    }
  }

  const currentWeekData = weeksData.find((item) => item.week === week);
  const weekWords: string[] = [];
  const meanings: string[] = [];

  if (currentWeekData) {
    for (const entry of currentWeekData.entries) {
      weekWords.push(entry.latin);
      if (entry.meaning) meanings.push(entry.meaning);
    }
  }

  // Construct a safe fallback phrase within the verified week words
  const sampleFallback =
    candidateSentences.length > 0
      ? candidateSentences[0]
      : {
          latin: weekWords.slice(0, 3).join(', '),
          english: meanings.slice(0, 3).join(', '),
        };

  const formattedFallback = `${sampleFallback.latin} (${sampleFallback.english})`;

  return {
    week,
    weekWords,
    meanings,
    allowedWords: Array.from(allowedSet),
    candidateSentences,
    fallbackPhrase: {
      latin: sampleFallback.latin,
      english: sampleFallback.english,
      formatted: formattedFallback,
    },
  };
}

export {
  type VulgateVerse,
  VULGATE_JOHN_1_VERSES,
  getRankedVulgateVersesForWords,
  getShortestVulgateVerseForWords,
  extractWeekLatinWords,
} from './vulgateSentenceBank';

import {
  type VulgateVerse,
  getRankedVulgateVersesForWords,
  extractWeekLatinWords,
} from './vulgateSentenceBank';

/**
 * Selects from the authentic Vulgate John 1:1–7 bank a verse for that week:
 * - Prefers the verse containing the MOST of that week's Latin words.
 * - Tie-breaks by shortest verse length.
 * - When two weeks would receive the same verse, gives the later week its next-best alternative if one exists.
 * - Accepts an optional usedVerses map/set so multi-week callers can pass tracked verse counts,
 *   or automatically resolves prior week assignments within the cycle up to `week`.
 */
export function getVulgateVerseForLatinWeek(
  cycle: 1 | 2 | 3,
  week: number,
  usedVerses?: Set<string> | Map<string, number>
): VulgateVerse | null {
  const weeksData = LATIN_MEMORY_WORK[cycle] || [];
  const weekData = weeksData.find((item) => item.week === week);
  if (!weekData || !weekData.entries || weekData.entries.length === 0) {
    return null;
  }

  // If usedVerses was provided by caller, select the best candidate that minimizes duplicate usage
  if (usedVerses) {
    const weekWords = extractWeekLatinWords(weekData.entries);
    const ranked = getRankedVulgateVersesForWords(weekWords);
    if (ranked.length === 0) return null;

    // First try an alternative that has not been used at all
    for (const cand of ranked) {
      const uses =
        usedVerses instanceof Set
          ? usedVerses.has(cand.reference)
            ? 1
            : 0
          : usedVerses.get(cand.reference) || 0;
      if (uses === 0) {
        return cand;
      }
    }

    // If all candidates have been used, pick the one used least (or best rank if tied)
    let bestCand = ranked[0];
    let minUses =
      usedVerses instanceof Set
        ? usedVerses.has(ranked[0].reference)
          ? 1
          : 0
        : usedVerses.get(ranked[0].reference) || 0;
    for (const cand of ranked) {
      const uses =
        usedVerses instanceof Set
          ? usedVerses.has(cand.reference)
            ? 1
            : 0
          : usedVerses.get(cand.reference) || 0;
      if (uses < minUses) {
        minUses = uses;
        bestCand = cand;
      }
    }
    return bestCand;
  }

  // If usedVerses is NOT provided (e.g. standalone lookup for week N),
  // simulate assigning weeks 1 through `week` sequentially so that later weeks
  // automatically receive their next-best alternatives!
  const assignedCounts = new Map<string, number>();
  let result: VulgateVerse | null = null;

  for (let w = 1; w <= week; w++) {
    const wData = weeksData.find((item) => item.week === w);
    if (!wData || !wData.entries || wData.entries.length === 0) continue;
    const words = extractWeekLatinWords(wData.entries);
    const ranked = getRankedVulgateVersesForWords(words);
    if (ranked.length === 0) continue;

    let chosen = ranked[0];
    let minUses = assignedCounts.get(ranked[0].reference) || 0;
    for (const cand of ranked) {
      const uses = assignedCounts.get(cand.reference) || 0;
      if (uses < minUses) {
        minUses = uses;
        chosen = cand;
      }
    }

    assignedCounts.set(chosen.reference, (assignedCounts.get(chosen.reference) || 0) + 1);
    if (w === week) {
      result = chosen;
    }
  }

  return result;
}

/**
 * Assigns authentic Vulgate verses across a series of weeks:
 * Prefers the verse containing the most words, tie-breaks by shortest,
 * and gives later weeks their next-best alternative when a verse has already been assigned.
 */
export function getVulgateVersesForLatinWeeks(
  cycle: 1 | 2 | 3,
  weeks: number[]
): Map<number, VulgateVerse> {
  const result = new Map<number, VulgateVerse>();
  const usedCounts = new Map<string, number>();
  const sortedWeeks = [...weeks].sort((a, b) => a - b);

  for (const w of sortedWeeks) {
    const verse = getVulgateVerseForLatinWeek(cycle, w, usedCounts);
    if (verse) {
      result.set(w, verse);
      usedCounts.set(verse.reference, (usedCounts.get(verse.reference) || 0) + 1);
    }
  }

  return result;
}

