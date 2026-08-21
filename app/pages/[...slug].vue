<template>
  <div v-if="page">
    <BlocksDynamic v-for="(block, index) in page.blocks" :key="index" :block="block" />
  </div>
</template>

<script setup lang="ts">
import type { Page } from '~~/server/utils/content'

const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug

const { data: page } = await useFetch<Page>(`/api/pages/${slug}`)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}

useMeta({
  title: page.value.title,
  description: page.value.seo.description,
  image: page.value.seo.image,
})
</script>
