import { Password } from '@/types'
import { api } from '../../api'

export const redefinePassword = async (data: Password, token: string) => {
  const newPassword = {
    password: data.password,
    senhaToken_recuperar: token,
  }
  const response = await api.post('/recoveyPassword', newPassword)
  return response
}
