import { useState, useCallback } from 'react'
import type { Card } from '../types'
import { MarkdownContent } from './MarkdownContent'
import './FlipCard.css'

interface Props {
  card: Card
  onNext?: () => void
  onPrev?: () => void
}

export function FlipCard({ card, onNext, onPrev }: Props) {
  const [flipped, setFlipped] = useState(false)
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  // Reset flip when card changes
  const [prevId, setPrevId] = useState(card.id)
  if (card.id !== prevId) {
    setPrevId(card.id)
    setFlipped(false)
    setImgError(false)
    setImgLoaded(false)
  }

  const handleFlip = useCallback(() => setFlipped(f => !f), [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleFlip()
      }
    },
    [handleFlip],
  )

  // Swipe detection
  let touchStartX = 0
  let touchStartY = 0

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX = e.touches[0].clientX
    touchStartY = e.touches[0].clientY
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX
    const dy = e.changedTouches[0].clientY - touchStartY
    // Only swipe left/right if horizontal movement dominates
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx < 0) onNext?.()
      else onPrev?.()
    } else if (Math.abs(dx) < 10 && Math.abs(dy) < 10) {
      // It was a tap
      handleFlip()
    }
  }

  return (
    <div
      className={`flip-card ${flipped ? 'flip-card--flipped' : ''}`}
      onClick={handleFlip}
      onKeyDown={handleKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={
        flipped
          ? `Rückseite von "${card.title}". Klicken zum Zurückblättern.`
          : `Vorderseite von "${card.title}". Klicken für Hilfen.`
      }
    >
      <div className="flip-card-inner">
        {/* Front – Image */}
        <div className="flip-card-face flip-card-front" aria-hidden={flipped}>
          {!imgLoaded && !imgError && (
            <div className="flip-img-placeholder">
              <div className="flip-img-spinner" />
            </div>
          )}
          {imgError ? (
            <div className="flip-img-fallback">
              <span className="flip-img-fallback-icon">🌳</span>
              <span className="flip-img-fallback-text">{card.title}</span>
            </div>
          ) : (
            <img
              src={card.image}
              alt={card.title}
              className={`flip-img ${imgLoaded ? 'flip-img--loaded' : ''}`}
              onLoad={() => setImgLoaded(true)}
              onError={() => { setImgError(true); setImgLoaded(true) }}
            />
          )}
          <div className="flip-card-hint flip-card-hint--front">
            <span>✦ Tippen für Hilfen</span>
          </div>
        </div>

        {/* Back – Markdown */}
        <div className="flip-card-face flip-card-back" aria-hidden={!flipped}>
          <div className="flip-back-scroll" onClick={e => e.stopPropagation()}>
            <MarkdownContent url={card.markdown} />
          </div>
          <div className="flip-card-hint flip-card-hint--back">
            <span>✦ Tippen für Bild</span>
          </div>
        </div>
      </div>
    </div>
  )
}
