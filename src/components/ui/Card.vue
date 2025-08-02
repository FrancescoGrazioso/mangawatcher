<template>
  <div :class="cardClasses" v-bind="$attrs">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'

interface Props {
  class?: string
}

const props = defineProps<Props>()

const cardClasses = computed(() => {
  return cn(
    "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
    props.class
  )
})
</script> 