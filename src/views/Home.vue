<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl font-bold text-primary">MangaWatcher</h1>
      <p class="text-muted-foreground text-lg">
        Traccia i tuoi manga preferiti e non perderti mai un nuovo volume
      </p>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card class="text-center">
        <CardContent class="pt-6">
          <div class="text-3xl font-bold text-primary">{{ totalManga }}</div>
          <p class="text-muted-foreground">Manga in Watchlist</p>
        </CardContent>
      </Card>

      <Card class="text-center">
        <CardContent class="pt-6">
          <div class="text-3xl font-bold text-blue-600">{{ readingManga }}</div>
          <p class="text-muted-foreground">In Lettura</p>
        </CardContent>
      </Card>

      <Card class="text-center">
        <CardContent class="pt-6">
          <div class="text-3xl font-bold text-green-600">{{ completedManga }}</div>
          <p class="text-muted-foreground">Completati</p>
        </CardContent>
      </Card>

      <Card class="text-center">
        <CardContent class="pt-6">
          <div class="text-3xl font-bold text-orange-600">{{ planToReadManga }}</div>
          <p class="text-muted-foreground">Da Leggere</p>
        </CardContent>
      </Card>
    </div>

    <!-- Quick Actions -->
    <Card>
      <CardHeader>
        <CardTitle>Azioni Rapide</CardTitle>
        <CardDescription>
          Gestisci rapidamente la tua watchlist
        </CardDescription>
      </CardHeader>
      <CardContent class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button @click="$router.push('/search')" class="w-full">
            <SearchIcon class="mr-2 h-4 w-4" />
            Cerca Nuovi Manga
          </Button>
          <Button @click="$router.push('/watchlist')" variant="outline" class="w-full">
            <BookOpenIcon class="mr-2 h-4 w-4" />
            Visualizza Watchlist
          </Button>
        </div>
      </CardContent>
    </Card>

    <!-- Recent Updates -->
    <Card v-if="recentManga.length > 0">
      <CardHeader>
        <CardTitle>Aggiornamenti Recenti</CardTitle>
        <CardDescription>
          I manga aggiornati di recente nella tua watchlist
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="space-y-4">
          <div 
            v-for="manga in recentManga.slice(0, 5)" 
            :key="manga.id"
            class="flex items-center space-x-4 p-4 rounded-lg border hover:bg-accent/50 transition-colors"
          >
            <img 
              :src="manga.image_url || '/placeholder-manga.jpg'" 
              :alt="manga.title"
              class="w-16 h-20 object-cover rounded-md"
              @error="$event.target.src = '/placeholder-manga.jpg'"
            />
            <div class="flex-1 min-w-0">
              <h3 class="font-semibold truncate">{{ manga.title }}</h3>
              <div class="flex items-center space-x-2 mt-1">
                <Badge :variant="getStatusVariant(manga.status)">
                  {{ getStatusLabel(manga.status) }}
                </Badge>
                <span class="text-sm text-muted-foreground">
                  {{ manga.volumes }} volumi
                </span>
              </div>
              <p class="text-sm text-muted-foreground mt-1">
                Aggiornato: {{ formatDate(manga.last_updated) }}
              </p>
            </div>
            <Button 
              @click="openAmazon(manga.amazon_url)"
              variant="outline" 
              size="sm"
            >
              <ExternalLinkIcon class="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>

    <!-- Empty State -->
    <Card v-else>
      <CardContent class="text-center py-12">
        <BookOpenIcon class="mx-auto h-12 w-12 text-muted-foreground mb-4" />
        <h3 class="text-lg font-semibold mb-2">La tua watchlist è vuota</h3>
        <p class="text-muted-foreground mb-4">
          Inizia aggiungendo alcuni manga alla tua watchlist per tracciarli
        </p>
        <Button @click="$router.push('/search')">
          <SearchIcon class="mr-2 h-4 w-4" />
          Cerca Manga
        </Button>
      </CardContent>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useWatchlistStore } from '@/store/watchlist'
import { SearchIcon, BookOpenIcon, ExternalLinkIcon } from 'lucide-vue-next'
import Card from '@/components/ui/Card.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardContent from '@/components/ui/CardContent.vue'
import Button from '@/components/ui/Button.vue'
import Badge from '@/components/ui/Badge.vue'

const watchlistStore = useWatchlistStore()

const totalManga = computed(() => watchlistStore.watchlist.length)
const readingManga = computed(() => watchlistStore.getMangaByStatus('reading').length)
const completedManga = computed(() => watchlistStore.getMangaByStatus('completed').length)
const planToReadManga = computed(() => watchlistStore.getMangaByStatus('plan_to_read').length)

const recentManga = computed(() => {
  return watchlistStore.watchlist.slice(0, 5)
})

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'reading': return 'default'
    case 'completed': return 'secondary'
    case 'plan_to_read': return 'outline'
    case 'on_hold': return 'destructive'
    case 'dropped': return 'destructive'
    default: return 'outline'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'reading': return 'In Lettura'
    case 'completed': return 'Completato'
    case 'plan_to_read': return 'Da Leggere'
    case 'on_hold': return 'In Pausa'
    case 'dropped': return 'Abbandonato'
    default: return status
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

const openAmazon = (url: string) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script> 