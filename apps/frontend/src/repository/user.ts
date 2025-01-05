import { api } from 'libs/src/eden'

export const getUser = async () => {
  const response = await api.api.v1.users.get({ $query: { userId: '1' } })
  return response.data
}