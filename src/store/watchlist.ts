import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { WatchlistManga, MALManga } from '@/types/manga'
import { generateMangaAmazonUrl } from '@/utils/amazon'

export const useWatchlistStore = defineStore('watchlist', () => {
  const watchlist = ref<WatchlistManga[]>([])
  const isLoading = ref(false)

  // Load watchlist from localStorage on initialization
  const loadWatchlist = () => {
    try {
      const saved = localStorage.getItem('mangawatcher-watchlist')
      if (saved) {
        watchlist.value = JSON.parse(saved)
      }
    } catch (error) {
      console.error('Error loading watchlist:', error)
    }
  }

  // Save watchlist to localStorage
  const saveWatchlist = () => {
    try {
      localStorage.setItem('mangawatcher-watchlist', JSON.stringify(watchlist.value))
    } catch (error) {
      console.error('Error saving watchlist:', error)
    }
  }

  // Add manga to watchlist
  const addToWatchlist = (manga: MALManga, status: WatchlistManga['status'] = 'plan_to_read', notes?: string) => {
    const existingIndex = watchlist.value.findIndex(m => m.id === manga.node.id)
    
    if (existingIndex !== -1) {
      // Update existing manga
      watchlist.value[existingIndex] = {
        ...watchlist.value[existingIndex],
        status,
        notes,
        last_updated: new Date().toISOString()
      }
    } else {
      // Add new manga
      const watchlistManga: WatchlistManga = {
        id: manga.node.id,
        title: manga.node.title,
        synopsis: manga.node.synopsis,
        image_url: manga.node.main_picture?.large || manga.node.main_picture?.medium,
        status,
        volumes: manga.node.num_volumes || 0,
        chapters: manga.node.num_chapters || 0,
        last_updated: new Date().toISOString(),
        added_at: new Date().toISOString(),
        notes,
        amazon_url: generateMangaAmazonUrl(manga.node.title)
      }
      
      watchlist.value.push(watchlistManga)
    }
    
    saveWatchlist()
  }

  // Remove manga from watchlist
  const removeFromWatchlist = (mangaId: number) => {
    const index = watchlist.value.findIndex(m => m.id === mangaId)
    if (index !== -1) {
      watchlist.value.splice(index, 1)
      saveWatchlist()
    }
  }

  // Update manga status
  const updateMangaStatus = (mangaId: number, status: WatchlistManga['status']) => {
    const manga = watchlist.value.find(m => m.id === mangaId)
    if (manga) {
      manga.status = status
      manga.last_updated = new Date().toISOString()
      saveWatchlist()
    }
  }

  // Update manga notes
  const updateMangaNotes = (mangaId: number, notes: string) => {
    const manga = watchlist.value.find(m => m.id === mangaId)
    if (manga) {
      manga.notes = notes
      manga.last_updated = new Date().toISOString()
      saveWatchlist()
    }
  }

  // Check if manga is in watchlist
  const isInWatchlist = (mangaId: number) => {
    return watchlist.value.some(m => m.id === mangaId)
  }

  // Get manga by status
  const getMangaByStatus = computed(() => (status: WatchlistManga['status']) => {
    return watchlist.value.filter(m => m.status === status)
  })

  // Get all manga sorted by last updated
  const sortedWatchlist = computed(() => {
    return [...watchlist.value].sort((a, b) => 
      new Date(b.last_updated).getTime() - new Date(a.last_updated).getTime()
    )
  })

  // Initialize store
  loadWatchlist()

  return {
    watchlist: sortedWatchlist,
    isLoading,
    addToWatchlist,
    removeFromWatchlist,
    updateMangaStatus,
    updateMangaNotes,
    isInWatchlist,
    getMangaByStatus
  }
}) 