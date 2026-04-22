import Link from 'next/link'
import { ProgressRing } from '@/components/examBrain/ProgressRing'
import { Upload } from 'lucide-react'

const courses = [
  { name: 'Organic Chemistry', tag: 'CHEM 301', docs: 8, questions: 142, mastery: 68 },
  { name: 'Civil Procedure', tag: 'LAW 201', docs: 5, questions: 97, mastery: 45 },
  { name: 'Macroeconomics', tag: 'ECON 202', docs: 6, questions: 118, mastery: 82 },
  { name: 'Molecular Biology', tag: 'BIO 405', docs: 9, questions: 203, mastery: 31 },
  { name: 'Constitutional Law', tag: 'LAW 301', docs: 4, questions: 76, mastery: 57 },
  { name: 'Fluid Mechanics', tag: 'MECH 204', docs: 7, questions: 132, mastery: 40 },
]

export default function CoursesPage() {
  return (
    <div className="px-10 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-serif text-2xl text-[#1C1917]">My Courses</h1>
        <Link
          href="/dashboard/upload"
          className="inline-flex items-center gap-2 h-9 px-4 bg-white border border-[#C2522B] text-[#C2522B] text-xs font-sans rounded hover:bg-[#F8F5F0] transition-colors"
        >
          <Upload size={13} />
          Add Material
        </Link>
      </div>
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
