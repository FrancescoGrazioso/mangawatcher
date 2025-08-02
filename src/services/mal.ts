import type { MALSearchResponse, MALManga } from '@/types/manga'

const MAL_BASE_URL = 'https://api.myanimelist.net/v2'

export class MALService {
  private clientId: string

  constructor() {
    this.clientId = import.meta.env.VITE_MAL_CLIENT_ID
    if (!this.clientId) {
      throw new Error('VITE_MAL_CLIENT_ID is not defined in environment variables')
    }
  }

  private async makeRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${MAL_BASE_URL}${endpoint}`, {
      headers: {
        'X-MAL-CLIENT-ID': this.clientId
      }
    })

    if (!response.ok) {
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