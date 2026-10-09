import { z } from 'zod'

const envSchema = z.object({
  SQS_URL: z.url(),
  PAYMENTS_TABLE_NAME: z.string(),
})

export const env = envSchema.parse(process.env)
