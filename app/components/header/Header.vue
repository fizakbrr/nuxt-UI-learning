<template>
  <UHeader>
    <template #title>
      <span class="font-serif text-xl font-semibold">Nuxt UI Learning</span>
    </template>

    <HeaderNav />

    <template #right>
      <UColorModeButton />
    </template>

    <template #body>
      <HeaderNav orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>
