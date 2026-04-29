import { useEffect, useCallback } from 'react'
import type { Card } from '../types'
import { FlipCard } from './FlipCard'
import './CardViewer.css'

interface Props {
  cards: Card[]
  currentIndex: number
  onNavigate: (index: number) => void
  onClose: () => void
}

export function CardViewer({ cards, currentIndex, onNavigate, onClose }: Props) {
  const card = cards[currentIndex]
  const total = cards.length

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) onNavigate(currentIndex + 1)
  }, [currentIndex, total, onNavigate])

  const goPrev = useCallback(() => {
    if (currentIndex > 0) onNavigate(currentIndex - 1)
  }, [currentIndex, onNavigate])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      else if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [goNext, goPrev, onClose])

  // Fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {})
    } else {
      document.exitFullscreen()
    }
  }

  return (
    <div className="viewer" role="dialog" aria-modal="true" aria-label={`Karte: ${card.title}`}>
      {/* Header bar */}
      <header className="viewer-header">
        <button className="viewer-btn viewer-btn--back" onClick={onClose} aria-label="Zurück zur Galerie">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          <span className="viewer-btn-label">Galerie</span>
        </button>

        <div className="viewer-title-wrap">
          <h1 className="viewer-title">{card.title}</h1>
          <span className="viewer-progress">{currentIndex + 1} / {total}</span>
        </div>

        <button className="viewer-btn viewer-btn--fs" onClick={toggleFullscreen} aria-label="Vollbild umschalten">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"/>
          </svg>
        </button>
      </header>

      {/* Main card area with nav */}
      <div className="viewer-stage">
        <button
          className="viewer-nav viewer-nav--prev"
          onClick={goPrev}
          disabled={currentIndex === 0}
          aria-label="Vorherige Karte"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <div className="viewer-card-wrap">
          <FlipCard card={card} onNext={goNext} onPrev={goPrev} />
        </div>

        <button
          className="viewer-nav viewer-nav--next"
          onClick={goNext}
          disabled={currentIndex === total - 1}
          aria-label="Nächste Karte"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>

    </div>
  )
}
