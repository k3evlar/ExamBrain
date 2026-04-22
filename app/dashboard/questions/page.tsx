import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function QuestionsPage() {
  return (
    <div className="px-10 py-10 max-w-[720px]">
      <h1 className="font-serif text-2xl text-[#1C1917] mb-2">Questions</h1>
      <p className="font-sans text-sm text-[#6B6460] mb-8">
        Browse and practise all questions across your courses.
      </p>
      <div className="bg-white border border-[#E8E4DE] rounded-lg p-8 text-center">
        <p className="font-sans text-sm text-[#6B6460] mb-4">
          Open a specific course to practise its questions.
        </p>
        <Link
          href="/dashboard/course"
          className="inline-flex items-center gap-2 font-sans text-sm text-[#C2522B] hover:underline"
        >
          Go to Organic Chemistry <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
