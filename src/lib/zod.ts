// Zod types for global usage

import { z } from 'zod'

export const SigninFormType = z.object({
	email: z.string().email(),
	password: z.string(),
})
