import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FlashcardsPage() {
  return (
    <div className="px-10 py-10 max-w-[720px]">
      <h1 className="font-serif text-2xl text-[#1C1917] mb-2">Flashcards</h1>
      <p className="font-sans text-sm text-[#6B6460] mb-8">
        Review your flashcards across all courses.
      </p>
      <div className="bg-white border border-[#E8E4DE] rounded-lg p-8 text-center">
        <p className="font-mono text-5xl text-[#C2522B] mb-2">22</p>
        <p className="font-sans text-sm text-[#6B6460] mb-6">cards due today across all courses</p>
        <Link
          href="/dashboard/course"
          className="inline-flex items-center gap-2 font-sans text-sm text-[#C2522B] hover:underline"
        >
          Start review in Organic Chemistry <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
