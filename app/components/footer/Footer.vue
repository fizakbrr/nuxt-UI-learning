<template>
  <UFooter>
    <template #left>
      <p class="text-muted text-sm">
        &copy; {{ new Date().getFullYear() }} Nuxt UI Learning
      </p>
    </template>

    <template #right>
      <UButton
        icon="i-lucide-github"
        color="neutral"
        variant="ghost"
        to="https://github.com/fizakbrr/nuxt-UI-learning"
        target="_blank"
        aria-label="View source on GitHub"
      />
    </template>
  </UFooter>
</template>
