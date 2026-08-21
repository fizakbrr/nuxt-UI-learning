<template>
  <UPageHero :title="title" :description="description" :links="links" />
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    title: string
    description?: string
    links?: { label: string; to: string; icon?: string }[]
  }>(),
  { description: '', links: () => [] },
)
</script>
