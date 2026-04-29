export interface Card {
  id: string
  title: string
  image: string
  markdown: string
}

export type View = 'gallery' | 'card'
