<template>
  <div id="app" class="min-h-screen bg-background">
    <nav class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <h1 class="text-xl font-bold text-primary">MangaWatcher</h1>
            <div class="hidden md:flex space-x-6">
              <router-link 
                to="/" 
                class="text-sm font-medium transition-colors hover:text-primary"
                active-class="text-primary"
              >
                Home
              </router-link>
              <router-link 
                to="/watchlist" 
                class="text-sm font-medium transition-colors hover:text-primary"
                active-class="text-primary"
              >
                Watchlist
              </router-link>
              <router-link 
                to="/search" 
                class="text-sm font-medium transition-colors hover:text-primary"
                active-class="text-primary"
              >
                Cerca Manga
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <button 
              @click="toggleTheme"
              class="p-2 rounded-md hover:bg-accent"
            >
              <SunIcon v-if="isDark" class="h-4 w-4" />
              <MoonIcon v-else class="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <main class="container mx-auto px-4 py-8">
      <router-view />
    </main>

    <!-- Mobile navigation -->
    <div class="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t">
      <div class="flex justify-around py-2">
        <router-link 
          to="/" 
          class="flex flex-col items-center p-2 text-xs"
          active-class="text-primary"
        >
          <HomeIcon class="h-5 w-5 mb-1" />
          Home
        </router-link>
        <router-link 
          to="/watchlist" 
          class="flex flex-col items-center p-2 text-xs"
          active-class="text-primary"
        >
          <BookOpenIcon class="h-5 w-5 mb-1" />
          Watchlist
        </router-link>
        <router-link 
          to="/search" 
          class="flex flex-col items-center p-2 text-xs"
          active-class="text-primary"
        >
          <SearchIcon class="h-5 w-5 mb-1" />
          Cerca
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { SunIcon, MoonIcon, HomeIcon, BookOpenIcon, SearchIcon } from 'lucide-vue-next'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark')
}
</script> 