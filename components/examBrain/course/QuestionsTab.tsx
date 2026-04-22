'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'

type Mode = 'Topic' | 'Paper' | 'Shuffle'

const topicFilters = ['All', 'Nucleophilic Sub.', 'Alkenes', 'Aromaticity', 'Carbonyl', 'Stereochemistry', 'Redox']

const questions = [
  {
    id: 14,
    source: 'Past Paper 2022',
    sourceType: 'past',
    marks: 5,
    topic: 'Nucleophilic Sub.',
    text: 'Explain, with the aid of a mechanism, why (R)-2-bromobutane undergoes SN2 reaction with NaOH to give predominantly the (S)-enantiomer of 2-butanol. Include in your answer the factors that affect the rate of SN2 reactions.',
    answer:
      'The SN2 reaction proceeds via a backside attack mechanism. The nucleophile (OH⁻) attacks the electrophilic carbon from the side opposite the leaving group (Br⁻), causing an inversion of configuration (Walden inversion). This converts the R configuration to S. The rate of SN2 is affected by: (1) nucleophile strength and concentration — stronger nucleophiles increase rate; (2) substrate structure — primary > secondary > tertiary due to steric hindrance; (3) leaving group ability — better leaving groups (lower pKₐ of conjugate acid) increase rate; (4) solvent — polar aprotic solvents (e.g. DMSO, acetone) favour SN2 by not solvating the nucleophile.',
  },
  {
    id: 15,
    source: 'AI Generated',
    sourceType: 'ai',
    marks: 3,
    topic: 'Alkenes',
    text: 'Predict the major product of the reaction of propene with HBr in the presence of peroxide (ROOR). Explain the regioselectivity observed and contrast it with the product obtained in the absence of peroxide.',
    answer:
      'In the presence of peroxide, the reaction proceeds via a radical mechanism. The bromine radical (Br•) adds to the less substituted carbon (following anti-Markovnikov regioselectivity) to form the more stable secondary radical intermediate. Major product: 1-bromopropane. Without peroxide, the reaction proceeds via an ionic mechanism following Markovnikov\'s rule — the proton adds to C1 (more H) giving a secondary carbocation at C2, and bromide attacks C2 giving 2-bromopropane.',
  },
  {
    id: 16,
    source: 'Past Paper 2021',
    sourceType: 'past',
    marks: 8,
    topic: 'Aromaticity',
    text: 'Using appropriate mechanisms, describe the nitration of benzene. Discuss the role of the sulfuric acid catalyst and explain why the reaction is classified as electrophilic aromatic substitution rather than electrophilic addition.',
    answer:
      'Nitration of benzene uses a nitrating mixture of concentrated HNO₃ and H₂SO₄. H₂SO₄ protonates HNO₃, leading to elimination of water and formation of the nitronium ion (NO₂⁺), the electrophile. Step 1: NO₂⁺ attacks the π system of benzene to form a resonance-stabilised arenium ion (σ-complex/Wheland intermediate) — aromaticity is temporarily lost. Step 2: A proton is lost from the sp³ carbon to an HSO₄⁻ base, restoring aromaticity. The reaction is substitution (not addition) because aromaticity provides exceptional thermodynamic stability (~150 kJ/mol resonance energy); restoration of aromaticity drives the proton loss step, making overall substitution thermodynamically favoured.',
  },
  {
    id: 17,
    source: 'AI Generated',
    sourceType: 'ai',
    marks: 4,
    topic: 'Stereochemistry',
    text: 'Assign R or S configuration to the chiral centre in (2R,3S)-2-bromo-3-chlorobutane and determine whether the compound is optically active. Is this compound a meso compound?',
    answer:
      'For C2 (bearing Br, Cl at C3, CH₃, H): Priority order is Br > Cl-bearing C3 > CH₃ > H. With H pointing away and tracing Br→C3→CH₃, the rotation is counterclockwise = S. For C3: Br at C2 > CH₃ > CH₃... applying CIP rules gives R. The compound (2R,3S)-2-bromo-3-chlorobutane has an internal plane of symmetry — it is a meso compound. Meso compounds are achiral despite having stereocentres, so this compound is optically inactive (will not rotate plane-polarised light).',
  },
]

export function QuestionsTab() {
  const [mode, setMode] = useState<Mode>('Topic')
  const [selectedFilter, setSelectedFilter] = useState('All')
  const [revealed, setRevealed] = useState<Set<number>>(new Set())
  const [done, setDone] = useState<Set<number>>(new Set())

  const toggleReveal = (id: number) => {
    setRevealed((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleDone = (id: number) => {
    setDone((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filteredQuestions =
    selectedFilter === 'All'
      ? questions
      : questions.filter((q) => q.topic === selectedFilter)

  return (
    <div>
      {/* Mode toggle + filter row */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {topicFilters.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFilter(f)}
              className={`shrink-0 font-mono text-[10px] px-2.5 py-1 rounded border transition-colors ${
                selectedFilter === f
                  ? 'border-[#C2522B] text-[#C2522B] bg-white'
                  : 'border-[#E8E4DE] text-[#6B6460] hover:border-[#1C1917] hover:text-[#1C1917]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Mode segmented control */}
        <div className="flex items-center border border-[#E8E4DE] rounded overflow-hidden shrink-0 ml-4">
          {(['Topic', 'Paper', 'Shuffle'] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`px-3 py-1.5 font-sans text-xs transition-colors ${
                mode === m
                  ? 'bg-[#C2522B] text-white'
                  : 'bg-white text-[#6B6460] hover:text-[#1C1917]'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* Paper mode progress bar */}
      {mode === 'Paper' && (
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-sans text-[#6B6460] mb-2">
            <span>Past Paper 2022 — Section A</span>
            <span className="font-mono">{done.size} / {filteredQuestions.length} done</span>
          </div>
          <div className="h-1.5 bg-[#E8E4DE] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#5C7A5C] rounded-full transition-all"
              style={{ width: `${(done.size / filteredQuestions.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-5">
        {filteredQuestions.map((q) => {
          const isDone = done.has(q.id)
          const isRevealed = revealed.has(q.id)

          return (
            <div
              key={q.id}
              className={`bg-white border border-[#E8E4DE] rounded-lg overflow-hidden transition-opacity ${
                isDone ? 'opacity-60' : ''
              }`}
            >
              <div className="p-5">
                {/* Top row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-[#C2522B]">Q.{q.id}</span>
                    <span
                      className={`font-mono text-[10px] px-1.5 py-0.5 rounded border ${
                        q.sourceType === 'ai'
                          ? 'text-[#B8860B] border-[#B8860B]'
                          : 'text-[#5C7A5C] border-[#5C7A5C]'
                      }`}
                    >
                      {q.source}
                    </span>
                    <span className="font-mono text-[10px] px-1.5 py-0.5 rounded border border-[#E8E4DE] text-[#6B6460]">
                      {q.marks} marks
                    </span>
                  </div>
                  <button
                    onClick={() => toggleDone(q.id)}
                    aria-label={isDone ? 'Mark as undone' : 'Mark as done'}
                    className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                      isDone
                        ? 'bg-[#5C7A5C] border-[#5C7A5C] text-white'
                        : 'border-[#E8E4DE] text-transparent hover:border-[#5C7A5C]'
                    }`}
                  >
                    <Check size={12} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Question text */}
                <p
                  className={`font-serif text-[17px] leading-relaxed mb-4 ${
                    isDone ? 'text-[#6B6460]' : 'text-[#1C1917]'
                  }`}
                >
                  {q.text}
                </p>

                {/* Reveal button */}
                <button
                  onClick={() => toggleReveal(q.id)}
                  className="w-full h-[38px] border border-[#C2522B] text-[#C2522B] rounded text-sm font-sans hover:bg-[#F8F5F0] transition-colors"
                >
                  {isRevealed ? 'Hide Answer' : 'Reveal Answer'}
                </button>
              </div>

              {/* Answer zone */}
              {isRevealed && (
                <div className="px-5 py-4 border-t border-[#E8E4DE]" style={{ backgroundColor: '#F5F0E8' }}>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-[#5C7A5C] mb-3">
                    Model Answer
                  </p>
                  <p className="font-sans text-sm text-[#1C1917] leading-relaxed">{q.answer}</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
