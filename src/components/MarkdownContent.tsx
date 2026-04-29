import { useEffect, useState } from 'react'
import './MarkdownContent.css'

// ── Parser ──────────────────────────────────────────────────────────────────

interface Impulse {
  heading: string
  text: string
}

interface WordGroup {
  heading: string
  type: 'nomen' | 'verb' | 'adj' | 'other'
  words: string[]
}

interface ParsedCard {
  title: string
  impulses: Impulse[]
  words: WordGroup[]
}

function parse(raw: string): ParsedCard {
  const lines = raw.split('\n').map(l => l.trim())
  const result: ParsedCard = { title: '', impulses: [], words: [] }

  type Section = 'none' | 'title' | 'impulse' | 'words'
  let section: Section = 'none'
  let currentImpulse: Impulse | null = null
  let currentGroup: WordGroup | null = null

  const IMPULSE_HEADERS = new Set(['Geschichte', 'Erlebnisbericht', 'Sachtext', 'Brief', 'Tagebucheintrag', 'Beschreibung', 'Bericht', 'Gedicht', 'Dialog', 'Anleitung', 'Steckbrief'])

  for (const line of lines) {
    // Section switches
    if (line === 'Bildtitel:') { section = 'title'; continue }
    if (line === 'Schreibimpulse:') {
      if (currentImpulse) result.impulses.push(currentImpulse)
      currentImpulse = null
      section = 'impulse'
      continue
    }
    if (line === 'Wortspeicher:') {
      if (currentImpulse) result.impulses.push(currentImpulse)
      currentImpulse = null
      if (currentGroup) result.words.push(currentGroup)
      currentGroup = null
      section = 'words'
      continue
    }

    if (section === 'title') {
      if (line) { result.title = line; section = 'none' }
      continue
    }

    if (section === 'impulse') {
      if (!line) continue
      if (IMPULSE_HEADERS.has(line)) {
        if (currentImpulse) result.impulses.push(currentImpulse)
        currentImpulse = { heading: line, text: '' }
      } else if (currentImpulse) {
        currentImpulse.text += (currentImpulse.text ? ' ' : '') + line
      }
      continue
    }

    if (section === 'words') {
      if (!line) continue
      const isNomen = /nomen|namenwört/i.test(line)
      const isVerb = /verb|tunwört/i.test(line)
      const isAdj = /adjekt|wiewört/i.test(line)
      if (isNomen || isVerb || isAdj) {
        if (currentGroup) result.words.push(currentGroup)
        const type = isNomen ? 'nomen' : isVerb ? 'verb' : 'adj'
        currentGroup = { heading: line, type, words: [] }
      } else if (currentGroup) {
        currentGroup.words.push(line)
      }
    }
  }

  if (currentImpulse) result.impulses.push(currentImpulse)
  if (currentGroup) result.words.push(currentGroup)

  return result
}

// ── Renderer ─────────────────────────────────────────────────────────────────

function CardContent({ data }: { data: ParsedCard }) {
  const chipClass = (type: WordGroup['type']) =>
    type === 'nomen' ? 'chip chip--nomen'
    : type === 'verb' ? 'chip chip--verb'
    : type === 'adj' ? 'chip chip--adj'
    : 'chip'

  return (
    <div className="md-content">
      {data.title && <h1 className="md-title">{data.title}</h1>}

      {data.impulses.length > 0 && (
        <section className="md-section">
          <h2 className="md-section-heading md-section-heading--impulse">
            ✏️ Schreibimpulse
          </h2>
          <div className="impulse-list">
            {data.impulses.map((imp, i) => (
              <div key={i} className="impulse-card">
                <h3 className="impulse-heading">{imp.heading}</h3>
                <p className="impulse-text">{imp.text}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {data.words.length > 0 && (
        <section className="md-section">
          <h2 className="md-section-heading md-section-heading--words">
            📝 Wortspeicher
          </h2>
          <div className="word-groups">
            {data.words.map((group, i) => (
              <div key={i} className={`word-group word-group--${group.type}`}>
                <h3 className="word-group-heading">{group.heading}</h3>
                <div className="chip-list">
                  {group.words.map((w, j) => (
                    <span key={j} className={chipClass(group.type)}>{w}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
  url: string
}

export function MarkdownContent({ url }: Props) {
  const [data, setData] = useState<ParsedCard | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    setError(false)
    setData(null)
    fetch(url)
      .then(r => {
        if (!r.ok) throw new Error('Not found')
        return r.text()
      })
      .then(text => {
        setData(parse(text))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [url])

  if (loading) {
    return (
      <div className="md-state">
        <div className="md-spinner" />
        <span>Wird geladen …</span>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="md-state md-state--error">
        <span className="md-state-icon">📄</span>
        <span>Hilfen konnten nicht geladen werden.</span>
      </div>
    )
  }

  return <CardContent data={data} />
}
