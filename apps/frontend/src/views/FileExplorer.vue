<script setup lang="ts">
import { useFilePreview } from '../provider/filePreview'
import { Breadcrumb } from 'primevue';
import ViewPanel from '../components/ViewPanel.vue'
import SearchBar from '../components/SearchBar.vue'
import FolderTreePanel from '../components/FolderTreePanel.vue'
import { ref } from 'vue';

const { filePreview } = useFilePreview()

const showFolderTree = ref(true)

const toggleFolderTree = () => {
  showFolderTree.value = !showFolderTree.value
}

</script>

<template>
  <div class="flex flex-col gap-2 w-full h-full p-2">
    <div class="flex flex-row justify-center bg-pink-900 h-14 rounded-md overflow-clip">
      <SearchBar />
    </div>

    <div class="flex flex-col h-full w-full bg-zinc-900 gap-2">
      <div class="flex flex-row justify-start">
        <button :class="showFolderTree ? 'ring-2' : 'ring-0'" class="bg-gray-200 rounded-md p-2 ring-blue-500"
          @click="toggleFolderTree">
          <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWZvbGRlci10cmVlIj48cGF0aCBkPSJNMjAgMTBhMSAxIDAgMCAwIDEtMVY2YTEgMSAwIDAgMC0xLTFoLTIuNWExIDEgMCAwIDEtLjgtLjRsLS45LTEuMkExIDEgMCAwIDAgMTUgM2gtMmExIDEgMCAwIDAtMSAxdjVhMSAxIDAgMCAwIDEgMVoiLz48cGF0aCBkPSJNMjAgMjFhMSAxIDAgMCAwIDEtMXYtM2ExIDEgMCAwIDAtMS0xaC0yLjlhMSAxIDAgMCAxLS44OC0uNTVsLS40Mi0uODVhMSAxIDAgMCAwLS45Mi0uNkgxM2ExIDEgMCAwIDAtMSAxdjVhMSAxIDAgMCAwIDEgMVoiLz48cGF0aCBkPSJNMyA1YTIgMiAwIDAgMCAyIDJoMyIvPjxwYXRoIGQ9Ik0zIDN2MTNhMiAyIDAgMCAwIDIgMmgzIi8+PC9zdmc+
" alt="Toggle Folder Tree Panel">
        </button>
      </div>
      <PrimeSplitter layout="horizontal" class="flex flex-row gap-2 w-full h-full">
        <SplitterPanel class="flex flex-col bg-gray-50 rounded-md w-full gap-2 p-2 overflow-x-scroll" :size="25"
          v-if="showFolderTree">
          <FolderTreePanel />
        </SplitterPanel>
        <SplitterPanel class="flex flex-col gap-2 p-2 bg-gray-50 rounded-md w-full" :size="75">
          <div class="flex flex-row gap-2 px-2 py-1 ring-1 ring-gray-200 rounded-md justify-start items-center">
            <div class="flex items-center justify-center">
              📁
            </div>
            <Breadcrumb class="text-sm text-gray-800"
              :model="filePreview?.path.split('/').map(path => ({ label: path }))" />
          </div>


          <div class="text-xl font-bold w-full p-2 bg-gray-200 rounded-md">
            {{ filePreview?.name ? filePreview.name : 'No file selected' }}
          </div>
          <ViewPanel :filePreview="filePreview" />
        </SplitterPanel>
      </PrimeSplitter>
    </div>
  </div>
</template>
