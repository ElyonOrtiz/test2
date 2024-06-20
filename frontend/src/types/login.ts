import { schemaValidationLogin } from '@/function/validationLogin'
import { z } from 'zod'

export type Login = z.infer<typeof schemaValidationLogin>
