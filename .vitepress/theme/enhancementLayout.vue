<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import ReplaceImageSrc from './replace-image-src.vue'
const { Layout } = DefaultTheme
</script>
<template>
  <Layout />
  <ClientOnly>
    <ReplaceImageSrc />
  </ClientOnly>
</template>
<style lang="scss"></style>
