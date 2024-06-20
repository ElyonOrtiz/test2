import { schemaValidationEmail } from '@/function'
import { z } from 'zod'

export type Emails = z.infer<typeof schemaValidationEmail>
