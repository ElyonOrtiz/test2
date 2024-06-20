import { z } from 'zod'

export const schemaValidationEmail = z.object({
  email: z.string().email('Informe um email válido'),
})
