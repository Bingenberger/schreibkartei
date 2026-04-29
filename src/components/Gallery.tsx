import { useState, useRef } from 'react'
import type { Card } from '../types'
import './Gallery.css'

interface Props {
  cards: Card[]
  onCardSelect: (index: number) => void
}

interface GalleryCardProps {
  card: Card
  index: number
  onSelect: (index: number) => void
}

function GalleryCard({ card, index, onSelect }: GalleryCardProps) {
  const [imgError, setImgError] = useState(false)
  const [imgLoaded, setImgLoaded] = useState(false)

  return (
    <button
      className="gallery-card"
      onClick={() => onSelect(index)}
      aria-label={`Karte öffnen: ${card.title}`}
      title={card.title}
    >
      <div className="gallery-card-img-wrap">
        {!imgLoaded && !imgError && <div className="gallery-card-shimmer" />}
        {imgError ? (
          <div className="gallery-card-fallback">
            <span className="gallery-card-fallback-icon">🌳</span>
          </div>
        ) : (
          <img
            src={card.image}
            alt={card.title}
            className={`gallery-card-img ${imgLoaded ? 'gallery-card-img--loaded' : ''}`}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            onError={() => { setImgError(true); setImgLoaded(true) }}
          />
        )}
        <div className="gallery-card-overlay">
          <span className="gallery-card-id">{card.id}</span>
        </div>
      </div>
      <div className="gallery-card-title">
        <span>{card.title}</span>
      </div>
    </button>
  )
}

export function Gallery({ cards, onCardSelect }: Props) {
  const [query, setQuery] = useState('')
  const searchRef = useRef<HTMLInputElement>(null)

  const filtered = query.trim()
    ? cards.filter(
        c =>
          c.title.toLowerCase().includes(query.toLowerCase()) ||
          c.id.toLowerCase().includes(query.toLowerCase()),
      )
    : cards

  return (
    <div className="gallery">
      {/* Header */}
      <header className="gallery-header">
        <div className="gallery-header-inner">
          <div className="gallery-brand">
            <span className="gallery-brand-icon">✏️</span>
            <h1 className="gallery-brand-name">Schreibanlass-Kartei</h1>
          </div>

          <div className="gallery-search-wrap">
            <label htmlFor="search" className="sr-only">Karten suchen</label>
            <div className="gallery-search-box">
              <svg className="gallery-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                id="search"
                ref={searchRef}
                type="search"
                placeholder="Karte suchen …"
                value={query}
                onChange={e => setQuery(e.target.value)}
                className="gallery-search-input"
                aria-label="Karte nach Titel oder ID suchen"
              />
              {query && (
                <button className="gallery-search-clear" onClick={() => { setQuery(''); searchRef.current?.focus() }} aria-label="Suche löschen">×</button>
              )}
            </div>
          </div>

          <div className="gallery-count">
            {filtered.length} {filtered.length === 1 ? 'Karte' : 'Karten'}
          </div>
        </div>
      </header>

      {/* Grid */}
      <main className="gallery-main">
        {filtered.length === 0 ? (
          <div className="gallery-empty">
            <span className="gallery-empty-icon">🔍</span>
            <p>Keine Karten gefunden für <strong>„{query}"</strong></p>
            <button className="gallery-empty-reset" onClick={() => setQuery('')}>Alle anzeigen</button>
          </div>
        ) : (
          <div className="gallery-grid" role="list">
            {filtered.map((card) => (
              <div key={card.id} role="listitem">
                <GalleryCard card={card} index={cards.indexOf(card)} onSelect={onCardSelect} />
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="gallery-footer">
        Nach Beate Leßmann · Schreibzeit
      </footer>
    </div>
  )
}
