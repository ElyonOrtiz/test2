'use client'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { schemaValidationLogin } from '@/function/validationLogin'
import { Login } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAlert } from './useAlert'
import { login } from '@/api/functions/login'
import { useRouter } from 'next/navigation'

export const useSingIn = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { alert, setAlert } = useAlert()
 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    mode: 'onBlur',
    resolver: zodResolver(schemaValidationLogin),
  })

  const HandleSubmitFormLogin = async (data: Login) => {
    setIsLoading(true)
    setAlert({
      message: '',
      type: '',
    })
    try {
      await login(data)
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        setAlert({
          message:  error.response.data.errors.default,
          type: 'error',
        })
      } else {
        setAlert({
          message: 'Error de servidor, Tente novamente mais tarde',
          type: 'error',
        })
      }
    } finally {
      setIsLoading(false)
      router.push('/dashboard')
    }
  }

  return {
    alert,
    setAlert,
    isLoading,
    HandleSubmitFormLogin,
    register,
    handleSubmit,
    formState: { errors },
  }
}
