import { useState, useCallback } from 'react'
import { Gallery } from './components/Gallery'
import { CardViewer } from './components/CardViewer'
import { cards } from './data/cards'
import './index.css'

export default function App() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openCard = useCallback((index: number) => setSelectedIndex(index), [])
  const closeCard = useCallback(() => setSelectedIndex(null), [])
  const navigate = useCallback((index: number) => setSelectedIndex(index), [])

  return (
    <>
      <Gallery cards={cards} onCardSelect={openCard} />
      {selectedIndex !== null && (
        <CardViewer
          cards={cards}
          currentIndex={selectedIndex}
          onNavigate={navigate}
          onClose={closeCard}
        />
      )}
    </>
  )
}
