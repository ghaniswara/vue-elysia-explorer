
import { folderTree } from 'backend/src/model/folder'
import { reactive, provide, inject } from 'vue'

const filePreviewSymbol = Symbol('filePreview')
export function useFilePreviewProvider() {
  const state = reactive<folderTree>({ id: '', name: '', children: [], type: 'folder', path: '' })

  const setFilePreview = (filePreview: folderTree) => {
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
    filePreview: folderTree | null
    setFilePreview: (filePreview: folderTree) => void
  }>(filePreviewSymbol)

  if (!context) {
    throw new Error('useFilePreview must be used within a useFilePreviewProvider.')
  }
  return context
}
