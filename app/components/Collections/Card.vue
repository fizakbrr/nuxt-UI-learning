<template>
  <NuxtLink :to="`/articles/${article.slug}`" class="group block">
    <figure
      class="mb-4 aspect-video w-full overflow-hidden rounded-md shadow-sm transition-shadow duration-300 ease-out group-hover:shadow-lg"
    >
      <NuxtImg
        :src="article.image"
        :alt="article.title"
        width="600"
        height="350"
        loading="lazy"
        class="h-full w-full object-cover transition-transform duration-300 ease-out motion-safe:group-hover:scale-105"
      />
    </figure>

    <UBadge size="sm" color="neutral" variant="subtle" class="mb-2">
      {{ article.category }}
    </UBadge>
    <h3
      class="font-serif text-lg leading-snug font-semibold transition-colors duration-200 group-hover:text-primary"
    >
      {{ article.title }}
    </h3>
    <p class="text-muted mt-1 text-sm">{{ article.excerpt }}</p>

    <div class="mt-3 flex items-center justify-between gap-2">
      <p class="text-muted text-xs">
        {{ article.views.toLocaleString('en-US') }} views &middot;
        {{ article.likes.toLocaleString('en-US') }} likes
      </p>
      <UIcon
        name="i-lucide-arrow-right"
        class="text-primary size-4 shrink-0 opacity-0 transition-all duration-200 ease-out group-hover:opacity-100 motion-safe:group-hover:translate-x-0.5"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Article } from '~~/server/utils/content'

defineProps<{ article: Article }>()
</script>
