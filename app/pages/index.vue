<template>
  <div>
    <template v-if="page">
      <BlocksDynamic v-for="(block, index) in page.blocks" :key="index" :block="block" />
    </template>

    <UPageSection v-if="articles?.length" title="Latest articles">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <CollectionsCard v-for="article in articles" :key="article.slug" :article="article" />
      </div>
      <div class="mt-8">
        <UButton
          label="View all articles"
          variant="link"
          trailing-icon="i-lucide-arrow-right"
          to="/articles"
        />
      </div>
    </UPageSection>
  </div>
</template>

<script setup lang="ts">
import type { Page, Article, Paginated } from '~~/server/utils/content'

const { data: page } = await useFetch<Page>('/api/pages/home')
const { data: articleData } = await useFetch<Paginated<Article>>('/api/articles', {
  query: { limit: 3 },
})

const articles = computed(() => articleData.value?.items ?? [])

useMeta({
  title: page.value?.title,
  description: page.value?.seo.description,
})
</script>
