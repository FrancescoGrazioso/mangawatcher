<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-8">
      <div>
        <h1 class="text-3xl font-bold tracking-tight">La Mia Watchlist</h1>
        <p class="text-muted-foreground mt-2">
          Gestisci i manga che stai tracciando
        </p>
      </div>
      <Button @click="refreshWatchlist" :disabled="isRefreshing">
        <RefreshCw v-if="!isRefreshing" class="h-4 w-4 mr-2" />
        <Loader2 v-else class="h-4 w-4 mr-2 animate-spin" />
        Aggiorna
      </Button>
    </div>

    <!-- Statistiche -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center space-x-2">
            <BookOpen class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm font-medium">In Lettura</span>
          </div>
          <div class="text-2xl font-bold mt-2">
            {{ readingCount }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center space-x-2">
            <CheckCircle class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm font-medium">Completati</span>
          </div>
          <div class="text-2xl font-bold mt-2">
            {{ completedCount }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center space-x-2">
            <Clock class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm font-medium">In Pausa</span>
          </div>
          <div class="text-2xl font-bold mt-2">
            {{ onHoldCount }}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent class="p-6">
          <div class="flex items-center space-x-2">
            <Plus class="h-4 w-4 text-muted-foreground" />
            <span class="text-sm font-medium">Da Leggere</span>
          </div>
          <div class="text-2xl font-bold mt-2">
            {{ planToReadCount }}
          </div>
        </CardContent>
      </Card>
    </div>

    <!-- Filtri -->
    <div class="flex flex-wrap gap-2 mb-6">
      <Button
        v-for="status in statusOptions"
        :key="status.value"
        :variant="selectedStatus === status.value ? 'default' : 'outline'"
        size="sm"
        @click="selectedStatus = status.value"
      >
        {{ status.label }}
      </Button>
    </div>

    <!-- Lista Manga -->
    <div v-if="filteredWatchlist.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card v-for="manga in filteredWatchlist" :key="manga.id" class="overflow-hidden">
        <div class="aspect-[3/4] overflow-hidden">
          <img
            :src="manga.image_url || '/placeholder-manga.jpg'"
            :alt="manga.title"
            class="w-full h-full object-cover"
            @error="handleImageError"
          />
        </div>
        <CardHeader class="p-4">
          <CardTitle class="text-lg line-clamp-2">{{ manga.title }}</CardTitle>
          <CardDescription class="line-clamp-2">
            {{ manga.synopsis || 'Nessuna descrizione disponibile' }}
          </CardDescription>
        </CardHeader>
        <CardContent class="p-4 pt-0">
          <div class="flex items-center justify-between mb-3">
            <Badge :variant="getStatusVariant(manga.status)">
              {{ getStatusLabel(manga.status) }}
            </Badge>
            <div class="text-sm text-muted-foreground">
              {{ manga.volumes }} volumi
            </div>
          </div>
          
          <div class="text-sm text-muted-foreground mb-3">
            Aggiornato: {{ formatDate(manga.last_updated) }}
          </div>

          <div v-if="manga.notes" class="text-sm bg-muted p-2 rounded mb-3">
            <strong>Note:</strong> {{ manga.notes }}
          </div>
        </CardContent>
        <CardFooter class="p-4 pt-0">
          <div class="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              @click="openMangaDetails(manga)"
              class="flex-1"
            >
              <Eye class="h-4 w-4 mr-1" />
              Dettagli
            </Button>
            <Button
              variant="outline"
              size="sm"
              @click="openAmazon(manga)"
              class="flex-1"
            >
              <ExternalLink class="h-4 w-4 mr-1" />
              Amazon
            </Button>
            <Button
              variant="destructive"
              size="sm"
              @click="removeFromWatchlist(manga)"
            >
              <Trash2 class="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>

    <!-- Stato vuoto -->
    <div v-else class="text-center py-12">
      <BookOpen class="h-12 w-12 text-muted-foreground mx-auto mb-4" />
      <h3 class="text-lg font-semibold mb-2">
        {{ selectedStatus === 'all' ? 'Nessun manga nella watchlist' : `Nessun manga con stato "${getStatusLabel(selectedStatus)}"` }}
      </h3>
      <p class="text-muted-foreground mb-4">
        {{ selectedStatus === 'all' ? 'Inizia ad aggiungere manga dalla pagina di ricerca' : 'Prova a cambiare il filtro o aggiungi nuovi manga' }}
      </p>
      <Button @click="$router.push('/search')" v-if="selectedStatus === 'all'">
        <Search class="h-4 w-4 mr-2" />
        Cerca Manga
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useWatchlistStore } from '@/store/watchlist'
import { useRouter } from 'vue-router'
import { toast } from 'sonner'
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Plus, 
  RefreshCw, 
  Loader2,
  Eye,
  ExternalLink,
  Trash2,
  Search
} from 'lucide-vue-next'
import Button from '@/components/ui/Button.vue'
import Card from '@/components/ui/Card.vue'
import CardContent from '@/components/ui/CardContent.vue'
import CardDescription from '@/components/ui/CardDescription.vue'
import CardFooter from '@/components/ui/CardFooter.vue'
import CardHeader from '@/components/ui/CardHeader.vue'
import CardTitle from '@/components/ui/CardTitle.vue'
import Badge from '@/components/ui/Badge.vue'
import { generateMangaAmazonUrl } from '@/utils/amazon'
import type { WatchlistManga } from '@/types/manga'

const router = useRouter()
const watchlistStore = useWatchlistStore()

const selectedStatus = ref<'all' | 'reading' | 'completed' | 'on_hold' | 'dropped' | 'plan_to_read'>('all')
const isRefreshing = ref(false)

const statusOptions = [
  { value: 'all', label: 'Tutti' },
  { value: 'reading', label: 'In Lettura' },
  { value: 'completed', label: 'Completati' },
  { value: 'on_hold', label: 'In Pausa' },
  { value: 'dropped', label: 'Abbandonati' },
  { value: 'plan_to_read', label: 'Da Leggere' }
]

const filteredWatchlist = computed(() => {
  if (selectedStatus.value === 'all') {
    return watchlistStore.watchlist
  }
  return watchlistStore.watchlist.filter((manga: any) => manga.status === selectedStatus.value)
})

const readingCount = computed(() => 
  watchlistStore.watchlist.filter(manga => manga.status === 'reading').length
)

const completedCount = computed(() => 
  watchlistStore.watchlist.filter(manga => manga.status === 'completed').length
)

const onHoldCount = computed(() => 
  watchlistStore.watchlist.filter(manga => manga.status === 'on_hold').length
)

const planToReadCount = computed(() => 
  watchlistStore.watchlist.filter(manga => manga.status === 'plan_to_read').length
)

const getStatusLabel = (status: string) => {
  const statusMap: Record<string, string> = {
    reading: 'In Lettura',
    completed: 'Completato',
    on_hold: 'In Pausa',
    dropped: 'Abbandonato',
    plan_to_read: 'Da Leggere'
  }
  return statusMap[status] || status
}

const getStatusVariant = (status: string) => {
  const variantMap: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
    reading: 'default',
    completed: 'secondary',
    on_hold: 'outline',
    dropped: 'destructive',
    plan_to_read: 'outline'
  }
  return variantMap[status] || 'outline'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('it-IT', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement
  target.src = '/placeholder-manga.jpg'
}

const openMangaDetails = (manga: WatchlistManga) => {
  // TODO: Implement modal with manga details
  toast.info(`Dettagli per ${manga.title}`)
}

const openAmazon = (manga: WatchlistManga) => {
  const amazonUrl = generateMangaAmazonUrl(manga.title)
  window.open(amazonUrl, '_blank')
  toast.success(`Aperto Amazon per ${manga.title}`)
}

const removeFromWatchlist = (manga: WatchlistManga) => {
  watchlistStore.removeFromWatchlist(manga.id)
  toast.success(`${manga.title} rimosso dalla watchlist`)
}

const refreshWatchlist = async () => {
  isRefreshing.value = true
  try {
    // TODO: Implement refresh logic to check for new volumes
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
    toast.success('Watchlist aggiornata')
  } catch (error) {
    toast.error('Errore durante l\'aggiornamento')
  } finally {
    isRefreshing.value = false
  }
}

onMounted(() => {
  // Load watchlist from localStorage
  watchlistStore.$reset()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 