<script setup lang="ts">
import { RouterView } from 'vue-router'
import '@/assets/main.css'
import { useFilePreviewProvider } from './provider/filePreview'

useFilePreviewProvider()
</script>

<template>
  <div class="bg-zinc-900 w-screen h-screen">
    <RouterView />
  </div>
</template>
