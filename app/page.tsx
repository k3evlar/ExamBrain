'use client'

import Link from 'next/link'

export default function LandingPage() {
  return (
    <main className="min-h-screen paper-texture flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-[720px]">
        {/* Label */}
        <p className="font-mono text-xs tracking-widest text-[#C2522B] uppercase mb-8">
          AI Study Assistant
        </p>

        {/* Headline */}
        <h1 className="font-serif text-[48px] leading-tight text-[#1C1917] mb-6 text-balance">
          Your notes. Your questions. Your{' '}
          <span
            className="inline-block"
            style={{
              borderBottom: '3px solid #C2522B',
              paddingBottom: '2px',
            }}
          >
            exam
          </span>{' '}
          pack.
        </h1>

        {/* Description */}
        <p className="font-sans text-base leading-relaxed text-[#6B6460] mb-10 max-w-[540px]">
          Upload your lecture notes and past papers. ExamBrain extracts every question,
          generates model answers, and builds your flashcard deck automatically.
        </p>

        {/* Google Sign In Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-3 h-[44px] px-6 bg-white border border-[#C2522B] text-[#C2522B] font-sans text-sm font-medium rounded-md hover:bg-[#F8F5F0] transition-colors"
        >
          {/* Google Icon */}
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M17.64 9.2045C17.64 8.5664 17.5827 7.9527 17.4764 7.3636H9V10.845H13.8436C13.635 11.97 13.0009 12.9232 12.0477 13.5614V15.8195H14.9564C16.6582 14.2527 17.64 11.9454 17.64 9.2045Z" fill="#4285F4"/>
            <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8195L12.0477 13.5614C11.2418 14.1014 10.2109 14.4204 9 14.4204C6.65591 14.4204 4.67182 12.8373 3.96409 10.71H0.957275V13.0418C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853"/>
            <path d="M3.96409 10.71C3.78409 10.17 3.68182 9.5932 3.68182 9C3.68182 8.4068 3.78409 7.83 3.96409 7.29V4.9582H0.957275C0.347727 6.1732 0 7.5477 0 9C0 10.4523 0.347727 11.8268 0.957275 13.0418L3.96409 10.71Z" fill="#FBBC05"/>
            <path d="M9 3.57955C10.3214 3.57955 11.5077 4.03364 12.4405 4.92545L15.0218 2.34409C13.4632 0.891818 11.4259 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.95818L3.96409 7.29C4.67182 5.16273 6.65591 3.57955 9 3.57955Z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </Link>

        {/* Footer note */}
        <p className="mt-8 text-xs text-[#6B6460] font-sans">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </main>
  )
}
