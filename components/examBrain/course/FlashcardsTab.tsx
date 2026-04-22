'use client'

import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

const flashcards = [
  { front: 'What is the rate-determining step in an SN1 reaction?', back: 'Formation of the carbocation intermediate. The rate depends only on the concentration of the substrate (first-order kinetics), not the nucleophile.' },
  { front: 'Define Hückel\'s rule for aromaticity.', back: 'A planar, cyclic, fully conjugated molecule is aromatic if it contains (4n + 2) π electrons, where n is a non-negative integer (0, 1, 2, …).' },
  { front: 'What is Markovnikov\'s rule?', back: 'In electrophilic addition to an asymmetrical alkene, the electrophile (e.g. H⁺) adds to the carbon bearing the greater number of hydrogen atoms, forming the more substituted (more stable) carbocation.' },
  { front: 'Distinguish enantiomers from diastereomers.', back: 'Enantiomers are non-superimposable mirror images (all stereocentres inverted). Diastereomers are stereoisomers that are not mirror images — they differ at one or more (but not all) stereocentres.' },
  { front: 'What reagent converts a primary alcohol to an aldehyde without over-oxidation?', back: 'Pyridinium chlorochromate (PCC) in DCM. It oxidises primary alcohols to aldehydes and secondary alcohols to ketones but cannot further oxidise aldehydes to carboxylic acids.' },
]

const previewCards = [
  { front: 'What is the inductive effect?' },
  { front: 'Define a leaving group.' },
  { front: 'What is a carbene?' },
]

type ReviewState = 'idle' | 'reviewing' | 'done'

const ratingButtons = [
  { label: 'Again', bg: '#7f1d1d', hover: '#991b1b' },
  { label: 'Hard', bg: '#B8860B', hover: '#92690B' },
  { label: 'Good', bg: '#5C7A5C', hover: '#4a6349' },
  { label: 'Easy', bg: '#15803d', hover: '#166534' },
]

export function FlashcardsTab() {
  const [reviewState, setReviewState] = useState<ReviewState>('idle')
  const [cardIndex, setCardIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [ratings, setRatings] = useState<string[]>([])

  const startReview = () => {
    setReviewState('reviewing')
    setCardIndex(0)
    setFlipped(false)
    setRatings([])
  }

  const handleRating = (rating: string) => {
    const next = [...ratings, rating]
    setRatings(next)
    if (cardIndex + 1 >= flashcards.length) {
      setReviewState('done')
    } else {
      setCardIndex((i) => i + 1)
      setFlipped(false)
    }
  }

  if (reviewState === 'reviewing') {
    const card = flashcards[cardIndex]
    return (
      <div className="fixed inset-0 bg-[#F8F5F0] flex flex-col items-center justify-center z-50 px-6">
        {/* Progress */}
        <p className="font-mono text-sm text-[#6B6460] mb-8">
          {cardIndex + 1} / {flashcards.length}
        </p>

        {/* Card */}
        <div
          className="card-flip-container w-full max-w-[560px] cursor-pointer"
          style={{ height: '260px' }}
          onClick={() => !flipped && setFlipped(true)}
        >
          <div className={`card-flip-inner ${flipped ? 'flipped' : ''}`} style={{ height: '260px' }}>
            {/* Front */}
            <div className="card-face bg-white border border-[#E8E4DE] rounded-xl flex flex-col items-center justify-center p-10 gap-4">
              <p className="font-serif text-[22px] text-[#1C1917] text-center leading-snug">{card.front}</p>
              {!flipped && (
                <p className="font-sans text-xs text-[#6B6460] mt-2">Tap to reveal</p>
              )}
            </div>
            {/* Back */}
            <div className="card-face card-back bg-white border border-[#E8E4DE] rounded-xl flex flex-col items-center justify-center p-10">
              <p className="font-sans text-base text-[#1C1917] text-center leading-relaxed">{card.back}</p>
            </div>
          </div>
        </div>

        {/* Rating buttons */}
        {flipped && (
          <div className="flex gap-3 mt-8 w-full max-w-[560px]">
            {ratingButtons.map(({ label, bg }) => (
              <button
                key={label}
                onClick={() => handleRating(label)}
                style={{ backgroundColor: bg }}
                className="flex-1 h-[44px] text-white text-sm font-sans rounded transition-opacity hover:opacity-90"
              >
                {label}
              </button>
            ))}
          </div>
        )}

        {/* Exit */}
        <button
          onClick={() => setReviewState('idle')}
          className="mt-6 text-xs font-sans text-[#6B6460] hover:text-[#1C1917]"
        >
          Exit session
        </button>
      </div>
    )
  }

  if (reviewState === 'done') {
    const counts = ratingButtons.reduce<Record<string, number>>((acc, { label }) => {
      acc[label] = ratings.filter((r) => r === label).length
      return acc
    }, {})

    return (
      <div className="fixed inset-0 bg-[#F8F5F0] flex flex-col items-center justify-center z-50 px-6">
        <div className="bg-white border border-[#E8E4DE] rounded-xl p-10 max-w-[480px] w-full text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle size={40} strokeWidth={1.5} color="#5C7A5C" />
          </div>
          <h2 className="font-serif text-2xl text-[#1C1917] mb-2">All done for today</h2>
          <p className="font-sans text-sm text-[#6B6460] mb-8">
            You reviewed {flashcards.length} cards. Great work.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            {Object.entries(counts).map(([label, count]) => (
              <div key={label} className="text-center">
                <p className="font-mono text-xl text-[#1C1917]">{count}</p>
                <p className="font-sans text-xs text-[#6B6460]">{label}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setReviewState('idle')}
            className="font-sans text-sm text-[#C2522B] hover:underline"
          >
            Return to course
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Due count */}
      <div className="mb-6">
        <p className="font-mono text-5xl text-[#1C1917] leading-none mb-1">22</p>
        <p className="font-sans text-sm text-[#6B6460]">cards due today</p>
      </div>

      {/* Start button */}
      <button
        onClick={startReview}
        className="w-full h-[44px] bg-[#C2522B] text-white font-sans text-sm rounded hover:bg-[#a8451f] transition-colors mb-8"
      >
        Start Review Session
      </button>

      {/* Preview grid */}
      <div>
        <p className="font-sans text-xs text-[#6B6460] uppercase tracking-wide mb-3">Up next</p>
        <div className="grid grid-cols-3 gap-3">
          {previewCards.map((card, i) => (
            <div
              key={i}
              className="bg-white border border-[#E8E4DE] rounded-lg p-4 min-h-[80px] flex items-center"
            >
              <p className="font-sans text-xs text-[#6B6460] leading-relaxed">{card.front}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
