import type { MALSearchResponse, MALManga } from '@/types/manga'

// Use local proxy in development, direct API in production
const isDevelopment = (import.meta as any).env?.DEV || false
const MAL_BASE_URL = isDevelopment ? '/api/mal' : 'https://api.myanimelist.net/v2'

export class MALService {
  private clientId: string

  constructor() {
    // Use environment variable with fallback for development
    this.clientId = (import.meta as any).env?.VITE_MAL_CLIENT_ID || ''
    if (!this.clientId) {
      console.warn('VITE_MAL_CLIENT_ID is not defined in environment variables')
    } else {
      console.log('MAL Client ID loaded successfully')
    }
  }

  private async makeRequest(endpoint: string): Promise<any> {
    const url = `${MAL_BASE_URL}${endpoint}`
    
    // Always include the client ID header
    const headers: Record<string, string> = {
      'X-MAL-CLIENT-ID': this.clientId
    }
    
    console.log('Making request to:', url)
    console.log('Headers:', headers)
    
    const response = await fetch(url, { headers })

    if (!response.ok) {
      console.error('Request failed:', response.status, response.statusText)
      throw new Error(`MAL API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
  }

  async searchManga(query: string, limit: number = 20): Promise<MALSearchResponse> {
    const encodedQuery = encodeURIComponent(query)
    const endpoint = `/manga?q=${encodedQuery}&limit=${limit}&fields=id,title,main_picture,synopsis,status,num_volumes,num_chapters,mean,media_type`
    
    return this.makeRequest(endpoint)
  }

  async getMangaDetails(mangaId: number): Promise<MALManga> {
    const endpoint = `/manga/${mangaId}?fields=id,title,main_picture,synopsis,status,num_volumes,num_chapters,mean,media_type`
    
    return this.makeRequest(endpoint)
  }

  async getMangaRanking(rankingType: string = 'all', limit: number = 20): Promise<MALSearchResponse> {
    const endpoint = `/manga/ranking?ranking_type=${rankingType}&limit=${limit}&fields=id,title,main_picture,synopsis,status,num_volumes,num_chapters,mean,media_type`
    
    return this.makeRequest(endpoint)
  }
}

export const malService = new MALService() 