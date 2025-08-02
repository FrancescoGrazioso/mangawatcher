<template>
  <div :class="contentClasses" v-bind="$attrs">
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

const contentClasses = computed(() => {
  return cn("px-6", props.class)
})
</script> 