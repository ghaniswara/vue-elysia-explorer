import {api} from 'libs/src/eden'

export const getUserFolders = async (userId: string) => {
  const response = await api.api.v1.folders[':userId'].get()
  return response.data
}