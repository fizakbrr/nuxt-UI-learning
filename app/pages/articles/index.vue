<template>
  <UPage>
    <UPageHero title="Articles" description="Notes on building this site with Nuxt 4." />

    <UPageBody>
      <UContainer>
        <UFormField label="Search" class="mb-8 max-w-sm">
          <UInput
            v-model="search"
            placeholder="Search articles..."
            icon="i-lucide-search"
            class="w-full"
          />
        </UFormField>

        <div v-if="status === 'pending'" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <USkeleton v-for="n in 6" :key="n" class="aspect-video w-full" />
        </div>

        <UAlert
          v-else-if="error"
          color="error"
          variant="subtle"
          icon="i-lucide-alert-triangle"
          title="Couldn't load articles"
          :description="error.statusMessage || 'Something went wrong.'"
        >
          <template #actions>
            <UButton label="Retry" color="error" variant="outline" @click="refresh()" />
          </template>
        </UAlert>

        <div v-else-if="!articles.length" class="py-16 text-center">
          <UIcon name="i-lucide-search-x" class="text-muted mx-auto size-10" />
          <p class="mt-4 text-lg font-medium">No articles match "{{ search }}"</p>
          <UButton label="Clear search" variant="link" class="mt-2" @click="search = ''" />
        </div>

        <template v-else>
          <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <CollectionsCard v-for="article in articles" :key="article.slug" :article="article" />
          </div>

          <UPagination
            v-if="data && data.totalPages > 1"
            v-model:page="page"
            :total="data.total"
            :items-per-page="data.limit"
            class="mt-10 justify-center"
          />
        </template>
      </UContainer>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
import type { Article, Paginated } from '~~/server/utils/content'

const route = useRoute()
const router = useRouter()

const search = ref(String(route.query.q ?? ''))
const debouncedSearch = refDebounced(search, 300)
const page = ref(Number(route.query.page ?? 1))

watch(debouncedSearch, () => {
  page.value = 1
})

watch(
  [debouncedSearch, page],
  ([q, p]) => {
    router.replace({ query: { ...(q ? { q } : {}), ...(p > 1 ? { page: p } : {}) } })
  },
  { flush: 'post' },
)

const {
  data,
  status,
  error,
  refresh,
} = await useFetch<Paginated<Article>>('/api/articles', {
  query: computed(() => ({ q: debouncedSearch.value, page: page.value, limit: 6 })),
})

const articles = computed(() => data.value?.items ?? [])

useMeta({
  title: 'Articles',
  description: 'Notes on building this site with Nuxt 4, Nuxt UI, and useFetch.',
})
</script>
