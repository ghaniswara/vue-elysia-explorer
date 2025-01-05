import type { FilePreview } from '@/types/TreeNode'
import { reactive, provide, inject } from 'vue'

const filePreviewSymbol = Symbol('filePreview')

export function useFilePreviewProvider() {
  const state = reactive<FilePreview>({
    name: 'root',
    children: [],
    path: '/',
  })

  const setFilePreview = (filePreview: FilePreview) => {
    state.children = filePreview.children
    state.name = filePreview.name
    state.path = filePreview.path
  }

  provide(filePreviewSymbol, {
    filePreview: state,
    setFilePreview,
  })
}

export function useFilePreview() {
  const context = inject<{
    filePreview: FilePreview
    setFilePreview: (filePreview: FilePreview) => void
  }>(filePreviewSymbol)

  if (!context) {
    throw new Error('useFilePreview must be used within a useFilePreviewProvider.')
  }
  return context
}
