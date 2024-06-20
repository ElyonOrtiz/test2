import { Emails } from '@/types'
import { api } from '../../api'

export const redefinePasswordEmail = async (data: Emails) => {
  const response = await api.get(`/recoveryPassword/${data.email}`)
  return response
}
