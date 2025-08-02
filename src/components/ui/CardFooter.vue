<template>
  <div :class="footerClasses" v-bind="$attrs">
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

const footerClasses = computed(() => {
  return cn("flex items-center px-6 [.border-t]:pt-6", props.class)
})
</script> 