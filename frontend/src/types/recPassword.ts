import { schemaValidationPassword } from '@/function'
import { z } from 'zod'

export type Password = z.infer<typeof schemaValidationPassword>
