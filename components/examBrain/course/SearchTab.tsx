'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

const allResults = [
  { type: 'Question', text: 'Explain why the SN2 mechanism is favoured in polar aprotic solvents over polar protic solvents.', source: 'Past Paper 2022' },
  { type: 'Note', text: 'Nucleophilic substitution reactions proceed via two distinct mechanisms: SN1 (unimolecular) and SN2 (bimolecular).', source: 'Lecture 4 Notes.pdf' },
  { type: 'Flashcard', text: 'What is the rate-determining step in an SN1 reaction?', source: 'Flashcard Deck A' },
  { type: 'Note', text: 'Markovnikov\'s rule states that electrophilic addition favours formation of the more substituted carbocation.', source: 'Lecture 7 Notes.pdf' },
  { type: 'Question', text: 'Draw the mechanism for the acid-catalysed hydration of propene. What is the major product?', source: 'Problem Set 3' },
  { type: 'Flashcard', text: 'Define aromaticity using Hückel\'s rule.', source: 'Flashcard Deck B' },
  { type: 'Note', text: 'Electrophilic aromatic substitution (EAS) preserves the aromatic ring through a resonance-stabilised Wheland intermediate.', source: 'Lecture 9 Notes.pdf' },
  { type: 'Question', text: 'Assign R/S configuration to the stereocentres in 2-bromo-3-chlorobutane.', source: 'Past Paper 2021' },
]

const typeBadgeStyle: Record<string, string> = {
  Note: 'text-[#1C1917] border-[#E8E4DE]',
  Question: 'text-[#5C7A5C] border-[#5C7A5C]',
  Flashcard: 'text-[#B8860B] border-[#B8860B]',
}

function highlight(text: string, query: string) {
  if (!query.trim()) return <>{text}</>
  const parts = text.split(new RegExp(`(${query})`, 'gi'))
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-transparent text-[#C2522B] font-semibold">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  )
}

export function SearchTab() {
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? allResults.filter(
        (r) =>
          r.text.toLowerCase().includes(query.toLowerCase()) ||
          r.type.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div>
      {/* Search input */}
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6460]" />
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your notes, questions, flashcards..."
          className="w-full h-[44px] pl-10 pr-4 bg-white border border-[#E8E4DE] rounded-lg font-sans text-sm text-[#1C1917] placeholder:text-[#6B6460] focus:outline-none focus:border-[#C2522B] transition-colors"
        />
      </div>

      {/* Results */}
      {query.trim() && (
        <div className="space-y-2">
          {results.length === 0 ? (
            <p className="font-sans text-sm text-[#6B6460] py-6 text-center">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            results.map((r, i) => (
              <div key={i} className="bg-white border border-[#E8E4DE] rounded-lg px-4 py-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`font-mono text-[10px] px-1.5 py-0.5 border rounded ${typeBadgeStyle[r.type]}`}>
                    {r.type}
                  </span>
                </div>
                <p className="font-sans text-sm text-[#1C1917] leading-relaxed mb-1">
                  {highlight(r.text, query)}
                </p>
                <p className="font-sans text-[11px] text-[#6B6460]">{r.source}</p>
              </div>
            ))
          )}
        </div>
      )}

      {!query.trim() && (
        <p className="font-sans text-sm text-[#6B6460] text-center py-10">
          Start typing to search across this course.
        </p>
      )}
    </div>
  )
}
