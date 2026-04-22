import Link from 'next/link'
import { ProgressRing } from '@/components/examBrain/ProgressRing'
import { ArrowRight } from 'lucide-react'

const courses = [
  {
    name: 'Organic Chemistry',
    tag: 'CHEM 301',
    docs: 8,
    questions: 142,
    mastery: 68,
  },
  {
    name: 'Civil Procedure',
    tag: 'LAW 201',
    docs: 5,
    questions: 97,
    mastery: 45,
  },
  {
    name: 'Macroeconomics',
    tag: 'ECON 202',
    docs: 6,
    questions: 118,
    mastery: 82,
  },
  {
    name: 'Molecular Biology',
    tag: 'BIO 405',
    docs: 9,
    questions: 203,
    mastery: 31,
  },
]

export default function DashboardPage() {
  return (
    <div className="px-10 py-10 max-w-[900px]">
      {/* Greeting */}
      <h1 className="font-serif text-2xl text-[#1C1917] mb-8">
        Good morning, Alex
      </h1>

      {/* Priority cards */}
      <div className="grid grid-cols-3 gap-4 mb-10">
        {/* Due for Review */}
        <div className="bg-white border border-[#E8E4DE] rounded-lg p-5 flex flex-col gap-3">
          <p className="font-sans text-xs text-[#6B6460] uppercase tracking-wide">Due for Review</p>
          <p className="font-mono text-4xl text-[#C2522B] leading-none">22</p>
          <p className="font-sans text-xs text-[#6B6460]">cards across 3 courses</p>
          <Link
            href="/dashboard/flashcards"
            className="mt-auto inline-flex items-center gap-1.5 text-xs font-sans text-[#C2522B] hover:underline"
          >
            Start Review <ArrowRight size={12} />
          </Link>
        </div>

        {/* Questions Pending */}
        <div className="bg-white border border-[#E8E4DE] rounded-lg p-5 flex flex-col gap-3">
          <p className="font-sans text-xs text-[#6B6460] uppercase tracking-wide">Questions Pending</p>
          <p className="font-mono text-4xl text-[#1C1917] leading-none">57</p>
          <p className="font-sans text-xs text-[#6B6460]">unattempted questions</p>
          <Link
            href="/dashboard/questions"
            className="mt-auto inline-flex items-center gap-1.5 text-xs font-sans text-[#C2522B] hover:underline"
          >
            Practice Now <ArrowRight size={12} />
          </Link>
        </div>

        {/* Exam Countdown */}
        <div className="bg-white border border-[#E8E4DE] rounded-lg p-5 flex flex-col gap-3">
          <p className="font-sans text-xs text-[#6B6460] uppercase tracking-wide">Exam Countdown</p>
          <p className="font-mono text-4xl text-[#1C1917] leading-none">14</p>
          <p className="font-sans text-xs text-[#6B6460]">days — Organic Chemistry</p>
          <Link
            href="/dashboard/courses"
            className="mt-auto inline-flex items-center gap-1.5 text-xs font-sans text-[#C2522B] hover:underline"
          >
            View Course <ArrowRight size={12} />
          </Link>
        </div>
      </div>

      {/* Section heading */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-serif text-lg text-[#1C1917]">My Courses</h2>
        <Link
          href="/dashboard/courses"
          className="text-xs font-sans text-[#C2522B] hover:underline"
        >
          View all
        </Link>
      </div>

      {/* Course grid */}
      <div className="grid grid-cols-2 gap-4">
        {courses.map((course) => (
          <Link
            key={course.name}
            href="/dashboard/course"
            className="group bg-white border-l-[3px] border-l-[#E8E4DE] border border-[#E8E4DE] rounded-lg p-5 hover:border-l-[#C2522B] transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-serif text-[16px] text-[#1C1917] leading-snug">{course.name}</h3>
                <span className="font-mono text-[10px] text-[#5C7A5C] border border-[#5C7A5C] rounded px-1.5 py-0.5 mt-1.5 inline-block">
                  {course.tag}
                </span>
              </div>
              <ProgressRing percent={course.mastery} />
            </div>
            <div className="flex items-center gap-4 mt-3 pt-3 border-t border-[#E8E4DE]">
              <span className="font-sans text-[11px] text-[#6B6460]">
                <span className="font-mono text-[#1C1917]">{course.docs}</span> docs
              </span>
              <span className="font-sans text-[11px] text-[#6B6460]">
                <span className="font-mono text-[#1C1917]">{course.questions}</span> questions
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
