export interface Card {
  id: string
  title: string
  image: string
  thumbnail: string
  markdown: string
}

export type View = 'gallery' | 'card'
