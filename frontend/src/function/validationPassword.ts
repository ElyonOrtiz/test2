import { z } from 'zod'

export const schemaValidationPassword = z
  .object({
    password: z.string().min(5, 'A senha deve conter pelo menos 5 caracteres'),
    password2: z.string().min(5, 'A senha deve conter pelo menos 5 caracteres'),
  })
  .refine((data) => data.password === data.password2, {
    message: 'As senhas precisam ser iguais',
    path: ['password2'],
  })
