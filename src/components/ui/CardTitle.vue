<template>
  <div :class="titleClasses" v-bind="$attrs">
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

const titleClasses = computed(() => {
  return cn("leading-none font-semibold", props.class)
})
</script> 