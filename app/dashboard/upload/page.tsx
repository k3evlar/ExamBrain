'use client'

import { useState, useRef, useCallback } from 'react'
import { Paperclip, Check, Loader2 } from 'lucide-react'

type FileType = 'Notes' | 'Exam Paper' | 'Syllabus' | 'Question Bank'

type Question = {
  question_number: string
  question_text: string
  marks: string
}

type PipelineStage = {
  label: string
  status: 'pending' | 'active' | 'done'
}

const fileTypes: FileType[] = ['Notes', 'Exam Paper', 'Syllabus', 'Question Bank']

const initialPipeline: PipelineStage[] = [
  { label: 'Extracting text', status: 'pending' },
  { label: 'Identifying questions', status: 'pending' },
  { label: 'Generating model answers', status: 'pending' },
  { label: 'Building flashcards', status: 'pending' },
]

export default function UploadPage() {
  const [dragOver, setDragOver] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedType, setSelectedType] = useState<FileType | null>(null)
  const [pipeline, setPipeline] = useState<PipelineStage[]>(initialPipeline)
  const [processing, setProcessing] = useState(false)
  const [complete, setComplete] = useState(false)
  const [questions, setQuestions] = useState<Question[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setUploadedFile(file)
    setSelectedType(null)
    setPipeline(initialPipeline)
    setProcessing(false)
    setComplete(false)
    setQuestions([])
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }, [])

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const startProcessing = async () => {
    if (!selectedType || !uploadedFile) return
    setProcessing(true)

    try {
      setPipeline((prev) => prev.map((s, idx) => ({ ...s, status: idx === 0 ? 'active' : 'pending' })))

      const formData = new FormData()
      formData.append('file', uploadedFile)

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (response.ok && data.data) {
        setQuestions(data.data)
      } else {
        console.error('API Error:', data.error || data)
      }

      setPipeline((prev) => prev.map((s, idx) => ({ ...s, status: idx === 0 ? 'done' : 'pending' })))

      for (let i = 1; i < initialPipeline.length; i++) {
        // Mark stage as active
        setPipeline((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx === i ? 'active' : idx < i ? 'done' : 'pending',
          }))
        )
        await new Promise((r) => setTimeout(r, 1400))
        // Mark stage as done
        setPipeline((prev) =>
          prev.map((s, idx) => ({
            ...s,
            status: idx <= i ? 'done' : 'pending',
          }))
        )
      }
    } catch (error) {
      console.error('Upload failed:', error)
    }

    setProcessing(false)
    setComplete(true)
  }

  return (
    <div className="px-10 py-10 max-w-[720px]">
      <h1 className="font-serif text-2xl text-[#1C1917] mb-2">Add Material</h1>
      <p className="font-sans text-sm text-[#6B6460] mb-8">
        Upload your notes, past papers, or syllabus to start building your study pack.
      </p>

      {/* Drop zone */}
      {!uploadedFile && (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={() => setDragOver(false)}
          onClick={() => fileInputRef.current?.click()}
          className={`flex flex-col items-center justify-center gap-4 py-16 px-8 rounded-lg cursor-pointer transition-colors ${
            dragOver
              ? 'border-2 border-solid border-[#C2522B] bg-[#F5F0E8]'
              : 'border-2 border-dashed border-[#C2522B]'
          }`}
          style={{ backgroundColor: dragOver ? '#F5F0E8' : undefined }}
          role="button"
          aria-label="Upload file"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        >
          <Paperclip size={28} strokeWidth={1.5} color="#C2522B" />
          <div className="text-center">
            <p className="font-sans text-sm text-[#1C1917] mb-1">
              Drop your notes, question papers, or syllabus here
            </p>
            <p className="font-sans text-xs text-[#6B6460]">
              PDF, DOCX, or TXT — up to 50 MB
            </p>
          </div>
          <span className="font-sans text-xs text-[#C2522B] border border-[#C2522B] rounded px-3 py-1.5 hover:bg-[#F8F5F0]">
            Browse files
          </span>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt"
            className="sr-only"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
        </div>
      )}

      {/* After upload */}
      {uploadedFile && (
        <div className="space-y-8">
          {/* File info */}
          <div className="flex items-center gap-3 p-4 bg-white border border-[#E8E4DE] rounded-lg">
            <Paperclip size={16} color="#C2522B" />
            <div>
              <p className="font-sans text-sm text-[#1C1917]">{uploadedFile.name}</p>
              <p className="font-sans text-xs text-[#6B6460]">
                {(uploadedFile.size / 1024).toFixed(0)} KB
              </p>
            </div>
            {!processing && !complete && (
              <button
                onClick={() => setUploadedFile(null)}
                className="ml-auto font-sans text-xs text-[#6B6460] hover:text-[#1C1917]"
              >
                Remove
              </button>
            )}
          </div>

          {/* File type selector */}
          {!processing && !complete && (
            <div>
              <p className="font-sans text-xs text-[#6B6460] uppercase tracking-wide mb-3">
                Select material type
              </p>
              <div className="flex flex-wrap gap-2">
                {fileTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`font-sans text-sm px-4 py-2 rounded border transition-colors ${
                      selectedType === type
                        ? 'bg-[#C2522B] border-[#C2522B] text-white'
                        : 'bg-white border-[#E8E4DE] text-[#1C1917] hover:border-[#C2522B] hover:text-[#C2522B]'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              <button
                onClick={startProcessing}
                disabled={!selectedType}
                className={`mt-6 w-full h-[44px] rounded font-sans text-sm transition-colors ${
                  selectedType
                    ? 'bg-[#C2522B] text-white hover:bg-[#a8451f]'
                    : 'bg-[#E8E4DE] text-[#6B6460] cursor-not-allowed'
                }`}
              >
                Process with AI
              </button>
            </div>
          )}

          {/* Pipeline */}
          {(processing || complete) && (
            <div>
              <p className="font-sans text-xs text-[#6B6460] uppercase tracking-wide mb-4">
                Processing pipeline
              </p>
              <ul className="space-y-4">
                {pipeline.map((stage, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      {stage.status === 'done' && (
                        <Check size={16} strokeWidth={2.5} color="#5C7A5C" />
                      )}
                      {stage.status === 'active' && (
                        <Loader2 size={16} color="#C2522B" className="animate-spin" />
                      )}
                      {stage.status === 'pending' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8E4DE] block" />
                      )}
                    </div>
                    <span
                      className={`font-sans text-sm ${
                        stage.status === 'done'
                          ? 'text-[#5C7A5C]'
                          : stage.status === 'active'
                          ? 'text-[#1C1917]'
                          : 'text-[#6B6460]'
                      }`}
                    >
                      {stage.label}
                    </span>
                  </li>
                ))}
              </ul>

              {complete && (
                <div className="mt-8 p-5 bg-white border border-[#5C7A5C] rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Check size={16} strokeWidth={2.5} color="#5C7A5C" />
                    <p className="font-sans text-sm font-medium text-[#5C7A5C]">Processing complete</p>
                  </div>
                  <p className="font-sans text-xs text-[#6B6460]">
                    Your material has been processed. {questions.length > 0 ? `${questions.length} questions extracted.` : `Processed material.`}
                  </p>
                  {questions.length === 0 && (
                    <a
                      href="/dashboard/course"
                      className="inline-block mt-4 font-sans text-sm text-[#C2522B] hover:underline"
                    >
                      View course &rarr;
                    </a>
                  )}
                </div>
              )}

              {complete && questions.length > 0 && (
                <div className="mt-8 space-y-4">
                  <h2 className="font-serif text-lg text-[#1C1917]">Extracted Questions</h2>
                  {questions.map((q, idx) => (
                    <div key={idx} className="p-4 bg-white border border-[#E8E4DE] rounded-lg shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-sans text-sm font-medium text-[#1C1917]">
                          {q.question_number ? `Q${q.question_number}` : `Question ${idx + 1}`}
                        </span>
                        {q.marks && (
                          <span className="font-sans text-xs text-[#6B6460] bg-[#F8F5F0] px-2 py-1 rounded">
                            {q.marks}
                          </span>
                        )}
                      </div>
                      <p className="font-sans text-sm text-[#1C1917] mb-4 whitespace-pre-wrap">{q.question_text}</p>
                      <button className="font-sans text-xs text-[#C2522B] hover:underline transition-colors focus:outline-none">
                        Reveal Answer
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
