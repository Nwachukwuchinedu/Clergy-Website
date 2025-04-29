// Teaching related types
export interface Teaching {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  publishedAt: string
  readingTime: number
  tags: string[]
  seriesId?: string
  seriesName?: string
  authorName: string
}

export interface TeachingFilters {
  search?: string
  seriesId?: string
  tags?: string[]
  startDate?: string
  endDate?: string
}

export interface TeachingListResponse {
  teachings: Teaching[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Series related types
export interface Series {
  id: string
  title: string
  slug: string
  description: string
  coverImage: string
  teachingCount: number
}

export interface SeriesDetailResponse {
  series: Series
  teachings: Teaching[]
}

// Comment related types
export interface Comment {
  id: number
  authorName: string
  authorEmail: string
  content: string
  createdAt: string
  teachingId: string
}

// Tag related types
export interface Tag {
  id: string
  name: string
  slug: string
  count: number
}