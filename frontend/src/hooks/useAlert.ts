'use client'
import { Alert } from '@/types'
import { useState } from 'react'

export const useAlert = () => {
  const [open, setOpen] = useState(false)
  const [alert, setAlert] = useState<Alert>({} as Alert)

  return {
    alert,
    setAlert,
    open,
    setOpen,
  }
}
