<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router'

/**
 * Remounts a page when the path or the query changes.
 * Product comments and catalog pages depend on that fresh setup.
 * @param page - Destination route.
 * @returns A unique key for the current URL.
 */
function resolvePageKey(page: RouteLocationNormalizedLoaded): string {
  return page.fullPath
}
</script>

<template>
  <NuxtLayout>
    <NuxtPage :page-key="resolvePageKey" />
  </NuxtLayout>
</template>
