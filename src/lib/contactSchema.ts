import { z } from 'zod'

export const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50),
  email: z
    .string()
    .email('Please enter a valid email address'),
  projectType: z.enum(
    ['portrait', 'wedding', 'commercial', 'fineart', 'other']
  ),
  otherProjectType: z.string().optional(),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(1000, 'Message cannot exceed 1000 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>
