import { api } from 'libs/src/eden'

export const getUser = async (userId: string) => {
  const response = await api.api.v1.users.get({ $query: { userId } })
  return response.data
}