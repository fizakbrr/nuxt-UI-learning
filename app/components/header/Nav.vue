<template>
  <UNavigationMenu :items="items" v-bind="$attrs" />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items: NavigationMenuItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Articles', to: '/articles' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]
</script>
