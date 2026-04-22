'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

const allResults = [
  { type: 'Question', text: 'Explain why SN2 mechanism is favoured in polar aprotic solvents.', source: 'Organic Chemistry — Past Paper 2022' },
  { type: 'Note', text: 'Nucleophilic substitution reactions proceed via two distinct mechanisms: SN1 and SN2.', source: 'Organic Chemistry — Lecture 4' },
  { type: 'Flashcard', text: 'What is the rate-determining step in an SN1 reaction?', source: 'Organic Chemistry — Deck A' },
  { type: 'Question', text: 'Distinguish between offer and acceptance in contract formation.', source: 'Civil Procedure — Past Paper 2023' },
  { type: 'Note', text: 'Gross Domestic Product (GDP) measures the total monetary value of all goods and services produced within a country.', source: 'Macroeconomics — Lecture 2' },
  { type: 'Question', text: 'Define opportunity cost and provide a real-world example.', source: 'Macroeconomics — Problem Set 1' },
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
          <mark key={i} className="bg-transparent text-[#C2522B] font-semibold">{part}</mark>
        ) : part
      )}
    </>
  )
}

export default function SearchPage() {
  const [query, setQuery] = useState('')

  const results = query.trim()
    ? allResults.filter((r) => r.text.toLowerCase().includes(query.toLowerCase()))
    : []

  return (
    <div className="px-10 py-10 max-w-[720px]">
      <h1 className="font-serif text-2xl text-[#1C1917] mb-6">Search</h1>
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B6460]" />
        <input
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across all courses, notes, and questions..."
          className="w-full h-[44px] pl-10 pr-4 bg-white border border-[#E8E4DE] rounded-lg font-sans text-sm text-[#1C1917] placeholder:text-[#6B6460] focus:outline-none focus:border-[#C2522B] transition-colors"
        />
      </div>

      {query.trim() && (
        <div className="space-y-2">
          {results.length === 0 ? (
            <p className="font-sans text-sm text-[#6B6460] py-6 text-center">No results for &ldquo;{query}&rdquo;</p>
          ) : results.map((r, i) => (
            <div key={i} className="bg-white border border-[#E8E4DE] rounded-lg px-4 py-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`font-mono text-[10px] px-1.5 py-0.5 border rounded ${typeBadgeStyle[r.type]}`}>{r.type}</span>
              </div>
              <p className="font-sans text-sm text-[#1C1917] leading-relaxed mb-1">{highlight(r.text, query)}</p>
              <p className="font-sans text-[11px] text-[#6B6460]">{r.source}</p>
            </div>
          ))}
        </div>
      )}
      {!query.trim() && (
        <p className="font-sans text-sm text-[#6B6460] text-center py-10">Start typing to search across all your courses.</p>
      )}
    </div>
  )
}
