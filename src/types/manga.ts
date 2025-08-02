export interface Manga {
  id: number
  title: string
  title_english?: string
  title_japanese?: string
  synopsis?: string
  image_url?: string
  status: 'reading' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_read'
  volumes: number
  chapters: number
  last_updated: string
  mal_url?: string
  amazon_url?: string
}

export interface MALManga {
  node: {
    id: number
    title: string
    main_picture?: {
      medium: string
      large: string
    }
    synopsis?: string
    status: string
    num_volumes: number
    num_chapters: number
    mean: number
    media_type: string
  }
}

export interface MALSearchResponse {
  data: MALManga[]
  paging: {
    next?: string
    previous?: string
  }
}

export interface WatchlistManga extends Manga {
  added_at: string
  notes?: string
} 