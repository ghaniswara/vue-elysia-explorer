<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useFilePreview } from '../provider/filePreview'
import { folderTree } from 'backend/src/model/folder'
const props = defineProps<{
  tree: folderTree
  isOpen: boolean
}>()

const emit = defineEmits<{
  'update:isOpen': [boolean]
}>()

const childrenOpen = ref<Record<string, boolean>>({})

onMounted(() => {
  props.tree.children?.forEach((child) => {
    if (!(child.id in childrenOpen.value)) {
      childrenOpen.value[child.id] = true
    }
  })
})

const { setFilePreview } = useFilePreview()

const onClickIcon = () => {
  emit('update:isOpen', !props.isOpen)
}

const onClickFileOrFolder = () => {
  setFilePreview(props.tree)
}
</script>

<template>
  <div class="">
    <div
      class="flex flex-row gap-1 justify-start items-center px-2 hover:bg-gray-200 rounded-md cursor-pointer"
      @click.stop="onClickFileOrFolder"
    >
      <p
        class="hover:bg-gray-300 w-fit rounded-md p-1"
        @click.stop="onClickIcon"
        v-if="tree.type === 'folder'"
      >
        {{ isOpen ? '📂' : '📁' }}
      </p>
      <p v-else>📄</p>
      <p class="w-full rounded-md" @click="onClickFileOrFolder">
        {{ tree.name }}
      </p>
    </div>
    <div class="flex flex-col gap-2 pl-2" v-if="isOpen">
      <FolderTree
        class="first:mt-2"
        v-for="child in tree.children"
        :key="child.id"
        :tree="child"
        v-model:isOpen="childrenOpen[child.id]"
        @click.stop
      />
    </div>
  </div>
</template>
