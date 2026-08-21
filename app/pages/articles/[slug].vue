<template>
  <UPage v-if="article">
    <UPageHeader :title="article.title" :description="article.excerpt" />

    <UPageBody>
      <UContainer>
        <div class="mb-6 flex items-center gap-2">
          <UBadge color="neutral" variant="subtle">{{ article.category }}</UBadge>
          <span class="text-muted text-sm">
            {{ article.views.toLocaleString('en-US') }} views &middot;
            {{ article.likes.toLocaleString('en-US') }} likes
          </span>
        </div>

        <NuxtImg
          :src="article.image"
          :alt="article.title"
          width="1200"
          height="600"
          class="mb-10 aspect-video w-full rounded-md object-cover"
        />
        <p class="prose-article mx-auto max-w-3xl whitespace-pre-wrap">{{ article.body }}</p>

        <div class="mx-auto mt-12 max-w-3xl">
          <UButton
            label="Back to articles"
            icon="i-lucide-arrow-left"
            variant="link"
            to="/articles"
          />
        </div>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
import type { Article } from '~~/server/utils/content'

const route = useRoute()
const slug = route.params.slug as string

const { data: article } = await useFetch<Article>(`/api/articles/${slug}`)

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useMeta({
  title: article.value.title,
  description: article.value.excerpt,
  image: article.value.image,
  type: 'article',
})
</script>
