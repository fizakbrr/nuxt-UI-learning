<template>
  <UPageSection :title="title">
    <div class="grid gap-x-8 gap-y-10 border-t border-default pt-8 md:grid-cols-3">
      <div v-for="item in items" :key="item.title">
        <h3 class="font-serif text-lg font-semibold">{{ item.title }}</h3>
        <p class="text-muted mt-2">{{ item.description }}</p>
      </div>
    </div>
  </UPageSection>
</template>

<script setup lang="ts">
defineProps<{
  title?: string
  items: { title: string; description: string }[]
}>()
</script>
