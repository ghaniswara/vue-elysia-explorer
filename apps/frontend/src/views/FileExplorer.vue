<script setup lang="ts">
import { onMounted, ref } from 'vue'
import FolderTree from '../components/FolderTree.vue'
import { useFilePreview } from '../provider/filePreview'
import { useRoute } from 'vue-router'
import { api } from 'libs/src/eden'
import { folderTree } from 'backend/src/model/folder'
import { Breadcrumb } from 'primevue';



const route = useRoute()
const username = (route.params.path)
console.log(username)

const folders = ref<folderTree | null>(null)
const isLoading = ref(true)

const fetchFolderTree = async () => {
  try {
    isLoading.value = true
    const response = await api.api.v1.folders[username as string].get({
    })
    folders.value = response?.data?.data ?? null
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
  <div class="flex flex-col gap-2 w-full h-full p-2">
    <div class="bg-gray-50 rounded-md p-2 items-center justify-center">
      Search
    </div>
    <div class="flex flex-row h-full w-full bg-zinc-900 gap-2">
      <PrimeSplitter layout="horizontal" class="flex flex-row gap-2 w-full h-full">
        <SplitterPanel class="flex bg-gray-50 rounded-md w-full gap-2 p-2 overflow-x-scroll" :size="25">
          <div v-if="isLoading" class="flex items-center justify-center h-full">
            <span class="text-gray-500">Loading...</span>
          </div>
          <FolderTree 
          class="overflow-x-scroll w-full"
          v-else-if="folders" :tree="folders" v-model:isOpen="isOpen" @click="handleClick" />
        </SplitterPanel>
        <SplitterPanel class="flex flex-col gap-2 p-2 bg-gray-50 rounded-md w-full" :size="75">
          <div class="flex flex-row gap-2 px-2 py-1 ring-1 ring-gray-200 rounded-md">
            <div class="flex items-center justify-center">
              📁
            </div>
            <Breadcrumb :model="filePreview?.path.split('/').map(path => ({ label: path }))" />
          </div>


          <div class="text-xl font-bold w-full p-2 bg-gray-200 rounded-md">
            {{ filePreview?.name ? filePreview.name : 'No file selected' }}
          </div>
          <div class="flex flex-row gap-2 w-full h-full">
            <div class="order-2 basis-1/6 p-2 bg-gray-200 rounded-md flex flex-col gap-2">
              <div class="text-sm font-bold flex p-2 bg-white rounded-md justify-center items-center">
                Current Folder Information
              </div>
            </div>
            <div class="grid grid-cols-4 gap-2 basis-5/6 grid-rows-12">
              <div class="hover:bg-gray-200 rounded-md p-2 cursor-pointer" v-for="file in filePreview?.children"
                :key="file.id">
                {{ file.name }}
              </div>
            </div>
          </div>
        </SplitterPanel>
      </PrimeSplitter>
    </div>
  </div>
</template>
