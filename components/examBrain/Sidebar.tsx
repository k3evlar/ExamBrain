'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  BookOpen,
  HelpCircle,
  Layers,
  Users,
  Search,
  LogOut,
} from 'lucide-react'

const navLinks = [
  { href: '/dashboard', icon: Home, label: 'Home' },
  { href: '/dashboard/courses', icon: BookOpen, label: 'My Courses' },
  { href: '/dashboard/questions', icon: HelpCircle, label: 'Questions' },
  { href: '/dashboard/flashcards', icon: Layers, label: 'Flashcards' },
  { href: '/dashboard/community', icon: Users, label: 'Community' },
  { href: '/dashboard/search', icon: Search, label: 'Search' },
]

const dueToday = [
  { course: 'Organic Chemistry', count: 12 },
  { course: 'Civil Procedure', count: 7 },
  { course: 'Macroeconomics', count: 3 },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed top-0 left-0 h-full w-[240px] flex flex-col border-r border-[#E8E4DE]"
      style={{ backgroundColor: '#F0EDE8' }}
    >
      {/* App name */}
      <div className="px-6 py-5 border-b border-[#E8E4DE]">
        <Link href="/dashboard">
          <span className="font-serif italic text-xl text-[#C2522B] tracking-tight">
            ExamBrain
          </span>
        </Link>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto" aria-label="Main navigation">
        <ul className="space-y-0.5">
          {navLinks.map(({ href, icon: Icon, label }) => {
            const isActive = pathname === href || pathname.startsWith(href + '/')
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded text-sm font-sans transition-colors relative ${
                    isActive
                      ? 'text-[#C2522B] bg-white'
                      : 'text-[#6B6460] hover:text-[#1C1917] hover:bg-white/60'
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full bg-[#C2522B]" />
                  )}
                  <Icon size={16} strokeWidth={1.75} />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Due Today section */}
        <div className="mt-6 px-3">
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#6B6460] mb-3">
            Due Today
          </p>
          <ul className="space-y-2">
            {dueToday.map(({ course, count }) => (
              <li key={course} className="flex items-center justify-between">
                <span className="text-xs font-sans text-[#1C1917] truncate">{course}</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 border border-[#5C7A5C] text-[#5C7A5C] rounded ml-2 shrink-0">
                  {count}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* User section */}
      <div className="px-4 py-4 border-t border-[#E8E4DE]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-7 h-7 rounded-full bg-[#C2522B] flex items-center justify-center shrink-0">
            <span className="font-mono text-[10px] text-white font-bold">AJ</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-sans font-medium text-[#1C1917] truncate">Alex Johnson</p>
            <p className="text-[10px] font-sans text-[#6B6460] truncate">alex@university.edu</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 text-[11px] font-sans text-[#6B6460] hover:text-[#1C1917] transition-colors mt-1"
        >
          <LogOut size={12} />
          Sign out
        </Link>
      </div>
    </aside>
  )
}
