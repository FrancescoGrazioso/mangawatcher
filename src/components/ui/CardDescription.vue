<template>
  <div :class="descriptionClasses" v-bind="$attrs">
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

const descriptionClasses = computed(() => {
  return cn("text-muted-foreground text-sm", props.class)
})
</script> 