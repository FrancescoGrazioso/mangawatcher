<template>
  <div class="space-y-8">
    <!-- Search Header -->
    <div class="space-y-4">
      <h1 class="text-3xl font-bold">Cerca Manga</h1>
      <p class="text-muted-foreground">
        Trova nuovi manga da aggiungere alla tua watchlist
      </p>
    </div>

    <!-- Search Form -->
    <Card>
      <CardContent class="pt-6">
        <div class="flex space-x-4">
          <div class="flex-1">
            <Input
              :value="searchQuery"
              @input="(e) => searchQuery = (e.target as HTMLInputElement).value"
              placeholder="Cerca manga (es. Berserk, One Piece...)"
              @keyup.enter="searchManga()"
            />
          </div>
          <Button @click="searchManga()" :disabled="isLoading">
            <SearchIcon v-if="!isLoading" class="mr-2 h-4 w-4" />
            <div v-else class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Cerca
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Popular Manga -->
    <Card v-if="!hasResults && !hasQuery">
      <CardHeader>
        <CardTitle>Manga Popolari</CardTitle>
        <CardDescription>
          Scopri i manga più popolari su MyAnimeList
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button @click="getPopularManga()" :disabled="isLoading" variant="outline">
          <TrendingUpIcon class="mr-2 h-4 w-4" />
          Carica Manga Popolari
        </Button>
      </CardContent>
    </Card>

    <!-- Error Message -->
    <Card v-if="error" class="border-destructive">
      <CardContent class="pt-6">
        <div class="flex items-center space-x-2 text-destructive">
          <AlertCircleIcon class="h-4 w-4" />
          <span>{{ error }}</span>
        </div>
      </CardContent>
    </Card>

    <!-- Search Results -->
    <div v-if="hasResults" class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold">
          Risultati ({{ searchResults.length }})
        </h2>
        <Button @click="clearSearch()" variant="outline" size="sm">
          <XIcon class="mr-2 h-4 w-4" />
          Pulisci
        </Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card 
          v-for="manga in searchResults" 
          :key="manga.node.id"
          class="hover:shadow-md transition-shadow"
        >
          <CardContent class="p-4">
            <div class="flex space-x-4">
              <img 
                :src="manga.node.main_picture?.large || manga.node.main_picture?.medium || '/placeholder-manga.jpg'" 
                :alt="manga.node.title"
                class="w-20 h-28 object-cover rounded-md flex-shrink-0"
                @error="$event.target.src = '/placeholder-manga.jpg'"
              />
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold text-sm line-clamp-2 mb-2">
                  {{ manga.node.title }}
                </h3>
                
                <div class="space-y-2 text-xs text-muted-foreground">
                  <div v-if="manga.node.num_volumes">
                    <span class="font-medium">Volumi:</span> {{ manga.node.num_volumes }}
                  </div>
                  <div v-if="manga.node.num_chapters">
                    <span class="font-medium">Capitoli:</span> {{ manga.node.num_chapters }}
                  </div>
                  <div v-if="manga.node.mean">
                    <span class="font-medium">Rating:</span> {{ manga.node.mean.toFixed(1) }}
                  </div>
                  <div v-if="manga.node.status">
                    <span class="font-medium">Stato:</span> {{ manga.node.status }}
                  </div>
                </div>

                <div class="flex space-x-2 mt-4">
                  <Button 
                    @click="addToWatchlist(manga)"
                    :disabled="isInWatchlist(manga.node.id)"
                    size="sm"
                    class="flex-1"
                  >
                    <PlusIcon v-if="!isInWatchlist(manga.node.id)" class="mr-1 h-3 w-3" />
                    <CheckIcon v-else class="mr-1 h-3 w-3" />
                    {{ isInWatchlist(manga.node.id) ? 'Aggiunto' : 'Aggiungi' }}
                  </Button>
                  
                  <Button 
                    @click="openMangaDetails(manga)"
                    variant="outline" 
                    size="sm"
                  >
                    <InfoIcon class="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>

    <!-- Empty State -->
    <Card v-else-if="hasQuery && !isLoading && !error">
      <CardContent class="text-center py-12">
        <SearchIcon class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold mb-2">Nessun risultato trovato</h3>
        <p class="text-muted-foreground">
          Prova con un termine di ricerca diverso
        </p>
      </CardContent>
    </Card>

    <!-- Loading State -->
    <Card v-if="isLoading">
      <CardContent class="text-center py-12">
        <div class="animate-spin rounded-full border-4 border-primary border-t-transparent h-8 w-8 mx-auto mb-4" />
        <p class="text-muted-foreground">Ricerca in corso...</p>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useMangaSearch } from '@/composables/useMangaSearch'
import { useWatchlistStore } from '@/store/watchlist'
import { SearchIcon, TrendingUpIcon, XIcon, PlusIcon, CheckIcon, InfoIcon, AlertCircleIcon } from 'lucide-vue-next'
import { toast } from 'sonner'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'

const {
  searchQuery,
  searchResults,
  isLoading,
  error,
  hasResults,
  hasQuery,
  searchManga,
  clearSearch,
  getPopularManga
} = useMangaSearch()

const watchlistStore = useWatchlistStore()

const isInWatchlist = (mangaId: number) => {
  return watchlistStore.isInWatchlist(mangaId)
}

const addToWatchlist = (manga: any) => {
  try {
    watchlistStore.addToWatchlist(manga)
    toast.success(`${manga.node.title} aggiunto alla watchlist`)
  } catch (error) {
    toast.error('Errore nell\'aggiunta del manga')
  }
}

const openMangaDetails = (manga: any) => {
  // TODO: Implement modal with manga details
  toast.info(`Dettagli per ${manga.node.title}`)
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 