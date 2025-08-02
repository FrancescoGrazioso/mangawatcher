import { ref, computed } from 'vue'
import { malService } from '@/services/mal'
import type { MALManga } from '@/types/manga'
import { toast } from 'sonner'

export function useMangaSearch() {
  const searchQuery = ref('')
  const searchResults = ref<MALManga[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const hasResults = computed(() => searchResults.value.length > 0)
  const hasQuery = computed(() => searchQuery.value.trim().length > 0)

  const searchManga = async (query?: string) => {
    // Use provided query or current searchQuery value
    let searchTerm = query
    if (!searchTerm) {
      searchTerm = searchQuery.value?.trim() || ''
    }
    
    console.log('Search called with:', { 
      providedQuery: query, 
      searchQueryValue: searchQuery.value, 
      finalSearchTerm: searchTerm,
      searchQueryLength: searchQuery.value?.length || 0
    })
    
    if (!searchTerm) {
      error.value = 'Inserisci un termine di ricerca'
      console.warn('Search term is empty')
      return
    }

    isLoading.value = true
    error.value = null

    try {
      const response = await malService.searchManga(searchTerm, 20)
      searchResults.value = response.data
      
      if (response.data.length === 0) {
        toast.info('Nessun risultato trovato per questa ricerca')
      } else {
        toast.success(`Trovati ${response.data.length} risultati`)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore durante la ricerca'
      error.value = errorMessage
      toast.error(errorMessage)
      searchResults.value = []
    } finally {
      isLoading.value = false
    }
  }

  const clearSearch = () => {
    searchQuery.value = ''
    searchResults.value = []
    error.value = null
  }

  const getPopularManga = async () => {
    isLoading.value = true
    error.value = null

    try {
      const response = await malService.getMangaRanking('all', 20)
      searchResults.value = response.data
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Errore nel caricamento dei manga popolari'
      error.value = errorMessage
      toast.error(errorMessage)
    } finally {
      isLoading.value = false
    }
  }

  return {
    searchQuery,
    searchResults,
    isLoading,
    error,
    hasResults,
    hasQuery,
    searchManga,
    clearSearch,
    getPopularManga
  }
} 