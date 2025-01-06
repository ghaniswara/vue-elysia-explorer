<script setup lang="ts">
import { folderTree } from 'backend/src/model/folder'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useFilePreview } from '../provider/filePreview'
import { api } from 'libs/src/eden'
import FolderTree from './FolderTree.vue'
const route = useRoute()
const username = (route.params.path)

const folders = ref<folderTree | null>(null)
const isLoading = ref(true)
const isOpen = ref(true)
const { setFilePreview } = useFilePreview()


const fetchFolderTree = async () => {
  try {
    isLoading.value = true
    const response = await api.api.v1.folders[username as string].get({
    })
    folders.value = response?.data?.data ?? null
    if (folders.value) {
      setFilePreview(folders.value)
    }
    console.log(folders.value)
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchFolderTree()
})

const handleClick = (node: folderTree) => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    setFilePreview(node)
  }
}
</script>

<template>
  <div v-if="isLoading" class="flex items-center justify-center h-full">
    <span class="text-gray-500">Loading...</span>
  </div>
  <FolderTree class="overflow-x-scroll w-full" v-else-if="folders" :tree="folders" v-model:isOpen="isOpen"
    @click="handleClick" />
</template>