<template>
  <UPageSection>
    <div class="prose-article max-w-3xl text-default" v-html="body" />
  </UPageSection>
</template>

<script setup lang="ts">
defineProps<{ body: string }>()
</script>
