<template>
  <component :is="getBlock(block.type)" v-bind="block" />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'

defineProps<{
  block: { type: string; [key: string]: unknown }
}>()

const blocks: Record<string, Component> = {
  hero: defineAsyncComponent(() => import('~/components/Blocks/Hero/HeroV1.vue')),
  features: defineAsyncComponent(() => import('~/components/Blocks/Features/FeaturesV1.vue')),
  richtext: defineAsyncComponent(() => import('~/components/Blocks/Richtext/RichtextV1.vue')),
}

function getBlock(type: string) {
  return blocks[type]
}
</script>
