'use client'

import { useState } from 'react'
import { HelpCircle, Layers, Copy } from 'lucide-react'

const subjects = ['All', 'Engineering', 'Medicine', 'Law', 'Science', 'Commerce', 'Arts']

const packs = [
  { course: 'Thermodynamics & Heat Transfer', tag: 'MECH 301', subject: 'Engineering', questions: 87, flashcards: 54, contributor: 'Priya M.' },
  { course: 'Contract Law Essentials', tag: 'LAW 101', subject: 'Law', questions: 63, flashcards: 41, contributor: 'James O.' },
  { course: 'Biochemistry: Enzymes & Metabolism', tag: 'MED 204', subject: 'Medicine', questions: 121, flashcards: 80, contributor: 'Sara K.' },
  { course: 'Electromagnetic Fields', tag: 'EE 302', subject: 'Engineering', questions: 94, flashcards: 67, contributor: 'Rohan V.' },
  { course: 'Macroeconomics: Growth Models', tag: 'ECON 301', subject: 'Commerce', questions: 55, flashcards: 38, contributor: 'Amina T.' },
  { course: 'Molecular Genetics', tag: 'BIO 410', subject: 'Science', questions: 108, flashcards: 72, contributor: 'Lucas F.' },
  { course: 'Criminal Procedure', tag: 'LAW 205', subject: 'Law', questions: 74, flashcards: 49, contributor: 'Chloe D.' },
  { course: 'Structural Analysis', tag: 'CIVIL 303', subject: 'Engineering', questions: 66, flashcards: 44, contributor: 'Yusuf A.' },
  { course: 'Clinical Pharmacology', tag: 'MED 310', subject: 'Medicine', questions: 139, flashcards: 92, contributor: 'Mei L.' },
]

export default function CommunityPage() {
  const [activeSubject, setActiveSubject] = useState('All')
  const [cloned, setCloned] = useState<Set<string>>(new Set())

  const filtered =
    activeSubject === 'All' ? packs : packs.filter((p) => p.subject === activeSubject)

  const handleClone = (course: string) => {
    setCloned((prev) => new Set([...prev, course]))
  }

  return (
    <div className="px-10 py-10">
      {/* Header */}
      <div className="mb-2">
        <h1 className="font-serif text-2xl text-[#1C1917]">Community Library</h1>
        <p className="font-sans text-sm text-[#6B6460] italic mt-1">
          Share your notes. Help someone pass.
        </p>
      </div>

      {/* Subject filters */}
      <div className="flex items-center gap-2 mt-6 mb-8 overflow-x-auto pb-1">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setActiveSubject(subject)}
            className={`shrink-0 font-sans text-xs px-3.5 py-1.5 rounded border transition-colors ${
              activeSubject === subject
                ? 'bg-[#C2522B] border-[#C2522B] text-white'
                : 'bg-white border-[#E8E4DE] text-[#6B6460] hover:border-[#C2522B] hover:text-[#C2522B]'
            }`}
          >
            {subject}
          </button>
        ))}
      </div>

      {/* Pack grid */}
      <div className="grid grid-cols-3 gap-4">
        {filtered.map((pack) => {
          const isCloned = cloned.has(pack.course)
          return (
            <div
              key={pack.course}
              className="bg-white border-l-[3px] border-l-[#C2522B] border border-[#E8E4DE] rounded-lg p-5 flex flex-col gap-3"
            >
              {/* Course name + tag */}
              <div>
                <h3 className="font-serif font-bold text-[15px] text-[#1C1917] leading-snug">{pack.course}</h3>
                <span className="font-mono text-[10px] text-[#5C7A5C] border border-[#5C7A5C] rounded px-1.5 py-0.5 inline-block mt-1.5">
                  {pack.tag}
                </span>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-4 pt-2 border-t border-[#E8E4DE]">
                <div className="flex items-center gap-1.5 text-xs font-sans text-[#6B6460]">
                  <HelpCircle size={12} strokeWidth={1.5} color="#6B6460" />
                  <span className="font-mono text-[#1C1917]">{pack.questions}</span> questions
                </div>
                <div className="flex items-center gap-1.5 text-xs font-sans text-[#6B6460]">
                  <Layers size={12} strokeWidth={1.5} color="#6B6460" />
                  <span className="font-mono text-[#1C1917]">{pack.flashcards}</span> cards
                </div>
              </div>

              {/* Contributor */}
              <p className="font-sans text-[11px] text-[#6B6460]">
                by {pack.contributor}
              </p>

              {/* Clone button */}
              <button
                onClick={() => handleClone(pack.course)}
                disabled={isCloned}
                className={`mt-auto flex items-center justify-center gap-2 h-[36px] border rounded text-xs font-sans transition-colors ${
                  isCloned
                    ? 'border-[#5C7A5C] text-[#5C7A5C] bg-white cursor-default'
                    : 'border-[#C2522B] text-[#C2522B] bg-white hover:bg-[#F8F5F0]'
                }`}
              >
                <Copy size={12} />
                {isCloned ? 'Added to My Courses' : 'Clone to My Courses'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
