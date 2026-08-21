<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useSeoMeta({
  title: props.error.statusCode === 404 ? 'Page not found' : 'Something went wrong',
  description: 'This page could not be found.',
})
</script>

<template>
  <UApp>
    <UMain>
      <div class="container flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p class="font-serif text-8xl font-semibold text-primary">
          {{ error.statusCode }}
        </p>
        <h1 class="mt-4 text-2xl font-semibold">
          {{ error.statusCode === 404 ? 'Page not found' : 'Something went wrong' }}
        </h1>
        <p class="text-muted mt-2 max-w-md">
          {{ error.statusCode === 404
            ? "The page you're looking for doesn't exist or was moved."
            : error.statusMessage || 'An unexpected error occurred.' }}
        </p>
        <UButton
          label="Back to home"
          icon="i-lucide-arrow-left"
          class="mt-6"
          @click="clearError({ redirect: '/' })"
        />
      </div>
    </UMain>
  </UApp>
</template>
