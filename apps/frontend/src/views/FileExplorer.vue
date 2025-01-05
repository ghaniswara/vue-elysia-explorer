<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FolderTree from '../components/FolderTree.vue'
import { useFilePreview } from '../provider/filePreview'
import { useRoute } from 'vue-router'
import { api } from 'libs/src/eden'
import { folderTree } from 'backend/src/model/folder'


const route = useRoute()
const username = (route.params.path)
console.log(username)

const folders = ref<folderTree[]>([])
const isLoading = ref(true)

const fetchFolderTree = async () => {
  try {
    isLoading.value = true
    const response = await api.api.v1.folders[username as string].get({
    })
    folders.value = response?.data?.data ?? []
    console.log(response)
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

const { filePreview, setFilePreview } = useFilePreview()

const isOpen = defineModel<boolean>({ required: true, default: true })

const handleClick = (node: folderTree) => {
  isOpen.value = !isOpen.value
  if (isOpen.value) {
    console.log(node)
    setFilePreview(node)
  }
}
</script>

<template>
  <div class="flex flex-row h-full w-full bg-zinc-900 gap-2 p-2">
    <div class="p-2 min-w-48 bg-gray-50 rounded-md">
      <div v-if="isLoading" class="flex items-center justify-center h-full">
        <span class="text-gray-500">Loading...</span>
      </div>
      <FolderTree 
        v-else
        :tree="folders[0]" 
        v-model:isOpen="isOpen" 
        @click="handleClick" 
      />
    </div>
    <div class="p-2 bg-gray-50 rounded-md w-full">
      {{ filePreview?.name ? filePreview.name : 'No file selected' }}
      <div v-for="file in filePreview.children" :key="file.path">
        {{ file.name }}
      </div>
    </div>
  </div>
</template>
