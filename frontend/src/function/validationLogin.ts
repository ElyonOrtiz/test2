import { Password } from './../types/recPassword';
import { z } from 'zod'

export const schemaValidationLogin = z.object({
  password: z.string().min(5, 'A senha deve conter pelo menos 5 caracteres'),
  email: z.string().email('Informe um email válido'),
})
