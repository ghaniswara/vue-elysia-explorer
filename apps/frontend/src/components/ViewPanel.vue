<script setup lang="ts">
import { folderTree } from 'backend/src/model/folder'
defineProps<{ 
	filePreview: folderTree | null;
}>()
</script>

<template>
	<div class="flex flex-row gap-2 w-full h-full">
	            <div class="order-2 basis-1/6 p-2 bg-gray-200 rounded-md flex flex-col gap-2 max-w-72">
	              <p class="text-sm font-bold flex p-2 bg-white rounded-md justify-center items-center">
	                Information
	              </p>
	              <div class="flex flex-col gap-2">
	                <div class="flex flex-col bg-white rounded-md p-2 max-w-full min-w-fit overflow-x-scroll">
	                  <div class="text-xs text-gray-500">Name</div>
	                  <div class="text-sm">{{ filePreview?.name || '-' }}</div>
	                </div>
	                <div class="flex flex-col bg-white rounded-md p-2 max-w-full min-w-fit overflow-x-scroll">
	                  <div class="text-xs text-gray-500">Path</div>
	                  <div class="text-sm">{{ filePreview?.path || '-' }}</div>
	                </div>
	                <div class="flex flex-col bg-white rounded-md p-2 max-w-full min-w-fit overflow-x-scroll">
	                  <div class="text-xs text-gray-500">Total Files</div>
	                  <div class="text-sm">{{ filePreview?.children?.length || 0 }}</div>
	                </div>
	              </div>
	            </div>
	            <div class="grid grid-cols-4 gap-2 basis-5/6 grid-rows-12" v-if="filePreview?.children.length">
	              <div class="hover:bg-gray-200 rounded-md p-2 cursor-pointer" v-for="file in filePreview?.children"
	                :key="file.id">
	                {{ file.name }}
	              </div>
	            </div>
				<div v-else class="flex items-center justify-center basis-5/6">No files available</div>
	          </div>
</template>
