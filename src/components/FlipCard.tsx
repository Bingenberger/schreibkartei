import { useState, useCallback, useRef } from 'react'
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
  const touchStart = useRef({ x: 0, y: 0 })

  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStart.current.x
    const dy = e.changedTouches[0].clientY - touchStart.current.y
    const adx = Math.abs(dx)
    const ady = Math.abs(dy)
    if (adx > ady && adx > 50) {
      // horizontal swipe → navigate
      if (dx < 0) onNext?.()
      else onPrev?.()
    } else if (ady > 20 && ady > adx) {
      // vertical scroll → ignore
    } else {
      // tap or small movement → flip
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
          <div className="flip-back-scroll">
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
