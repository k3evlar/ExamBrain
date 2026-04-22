const keyConcepts = [
  {
    concept: 'Nucleophilic Substitution (SN1 & SN2)',
    explanation:
      'SN1 reactions proceed via a carbocation intermediate and follow first-order kinetics. SN2 reactions involve simultaneous bond-breaking and bond-forming in a single concerted step, inverting stereochemistry.',
  },
  {
    concept: 'Alkene Addition Reactions',
    explanation:
      'Electrophilic addition to alkenes follows Markovnikov\'s rule — the electrophile adds to the carbon with more hydrogens. Anti-Markovnikov additions occur via radical mechanisms or hydroboration.',
  },
  {
    concept: 'Aromaticity & Benzene Reactions',
    explanation:
      'Aromatic compounds follow Hückel\'s rule (4n+2 π electrons in a planar cyclic system). Electrophilic aromatic substitution preserves the aromatic ring through a resonance-stabilised arenium ion intermediate.',
  },
  {
    concept: 'Carbonyl Chemistry',
    explanation:
      'The carbonyl carbon is electrophilic due to the electronegative oxygen pulling electron density. Nucleophiles attack at the carbon, leading to addition (aldehydes/ketones) or acyl substitution (esters/acid chlorides).',
  },
  {
    concept: 'Stereochemistry',
    explanation:
      'Chirality arises when a carbon bears four different substituents. Enantiomers are non-superimposable mirror images; diastereomers differ in configuration at one or more (but not all) stereocentres.',
  },
  {
    concept: 'Oxidation & Reduction',
    explanation:
      'In organic chemistry, oxidation typically increases C–O bonds or decreases C–H bonds. Common reagents include PCC (selective alcohol to aldehyde), KMnO₄ (alkene cleavage), and LiAlH₄ (reduction of carbonyls).',
  },
]

const topicPriorities = [
  { topic: 'Nucleophilic Substitution Mechanisms', priority: 'High' },
  { topic: 'Electrophilic Aromatic Substitution', priority: 'High' },
  { topic: 'Carbonyl Addition & Acyl Substitution', priority: 'High' },
  { topic: 'Stereochemistry & R/S Configuration', priority: 'Medium' },
  { topic: 'Oxidation-Reduction Reagents', priority: 'Medium' },
  { topic: 'Pericyclic Reactions', priority: 'Low' },
]

const priorityStyle: Record<string, string> = {
  High: 'text-[#C2522B] border-[#C2522B]',
  Medium: 'text-[#B8860B] border-[#B8860B]',
  Low: 'text-[#5C7A5C] border-[#5C7A5C]',
}

export function SummaryTab() {
  return (
    <div className="space-y-10">
      {/* Key Concepts */}
      <section>
        <h2 className="font-serif text-lg text-[#1C1917] mb-5">Key Concepts</h2>
        <ol className="space-y-5">
          {keyConcepts.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-mono text-sm text-[#C2522B] shrink-0 mt-0.5">
                {String(i + 1).padStart(2, '0')}.
              </span>
              <div>
                <p className="font-sans font-semibold text-sm text-[#1C1917] mb-1">{item.concept}</p>
                <p className="font-sans text-sm text-[#6B6460] leading-relaxed">{item.explanation}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Topic Priority */}
      <section>
        <h2 className="font-serif text-lg text-[#1C1917] mb-5">Topic Priority</h2>
        <ul className="space-y-2">
          {topicPriorities.map(({ topic, priority }) => (
            <li
              key={topic}
              className="flex items-center justify-between py-3 border-b border-[#E8E4DE]"
            >
              <span className="font-sans text-sm text-[#1C1917]">{topic}</span>
              <span
                className={`font-mono text-[10px] px-2 py-0.5 border rounded shrink-0 ml-4 ${priorityStyle[priority]}`}
              >
                {priority}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
