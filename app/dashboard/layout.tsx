import { Sidebar } from '@/components/examBrain/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-[240px] min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  )
}
