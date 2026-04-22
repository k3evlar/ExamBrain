'use client'

import { useState } from 'react'
import { SummaryTab } from '@/components/examBrain/course/SummaryTab'
import { QuestionsTab } from '@/components/examBrain/course/QuestionsTab'
import { FlashcardsTab } from '@/components/examBrain/course/FlashcardsTab'
import { SearchTab } from '@/components/examBrain/course/SearchTab'
import { Upload } from 'lucide-react'
import Link from 'next/link'

const tabs = ['Summary', 'Questions', 'Flashcards', 'Search'] as const
type Tab = (typeof tabs)[number]

export default function CoursePage() {
  const [activeTab, setActiveTab] = useState<Tab>('Summary')

  return (
    <div className="px-10 py-10">
      {/* Course header */}
      <div className="flex items-start justify-between mb-1">
        <div>
          <span className="font-mono text-xs text-[#5C7A5C] border border-[#5C7A5C] rounded px-1.5 py-0.5">
            CHEM 301
          </span>
          <h1 className="font-serif text-2xl text-[#1C1917] mt-2">Organic Chemistry</h1>
        </div>
        <Link
          href="/dashboard/upload"
          className="inline-flex items-center gap-2 h-9 px-4 bg-white border border-[#C2522B] text-[#C2522B] text-xs font-sans rounded hover:bg-[#F8F5F0] transition-colors"
        >
          <Upload size={13} />
          Add Material
        </Link>
      </div>

      <div className="flex items-center gap-4 mt-1 mb-6 text-xs font-sans text-[#6B6460]">
        <span><span className="font-mono text-[#1C1917]">8</span> documents</span>
        <span><span className="font-mono text-[#1C1917]">142</span> questions</span>
        <span><span className="font-mono text-[#5C7A5C]">68%</span> mastery</span>
        <span><span className="font-mono text-[#C2522B]">14</span> days to exam</span>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#E8E4DE] mb-8">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative pb-3 text-sm font-sans transition-colors ${
                activeTab === tab
                  ? 'text-[#1C1917]'
                  : 'text-[#6B6460] hover:text-[#1C1917]'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C2522B] rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="max-w-[720px]">
        {activeTab === 'Summary' && <SummaryTab />}
        {activeTab === 'Questions' && <QuestionsTab />}
        {activeTab === 'Flashcards' && <FlashcardsTab />}
        {activeTab === 'Search' && <SearchTab />}
      </div>
    </div>
  )
}
