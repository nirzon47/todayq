'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { SigninFormType } from '@/lib/zod'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SigninForm = () => {
	// Form state
	const [form, setForm] = useState<z.infer<typeof SigninFormType>>({
		email: '',
		password: '',
	})

	const { toast } = useToast()
	const router = useRouter()
	const { status } = useSession()

	// Form handler
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (!SigninFormType.safeParse(form).success) {
			toast({
				title: 'Error',
				description: 'Please fill in all fields correctly',
				variant: 'destructive',
			})

			return
		}

		signIn(
			'credentials',
			{
				email: form.email,
				password: form.password,
				redirect: true,
			},
			{
				callbackUrl: '/dashboard',
			},
		)
	}

	// Input handlers
	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, email: e.target.value })
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, password: e.target.value })
	}

	useEffect(() => {
		// Redirects user to home page if authenticated
		if (status === 'authenticated') {
			router.push('/dashboard')
		}
	}, [status, router])

	return (
		<form className='grid gap-4' onSubmit={handleSubmit}>
			<div className='grid gap-2'>
				<Label htmlFor='email'>Email</Label>
				<Input
					id='email'
					type='email'
					placeholder='john@doe.com'
					required
					onChange={handleEmailChange}
				/>
			</div>
			<div className='grid gap-2'>
				<div className='flex items-center'>
					<Label htmlFor='password'>Password</Label>
				</div>
				<Input
					id='password'
					type='password'
					required
					onChange={handlePasswordChange}
				/>
			</div>
			<Button type='submit' className='w-full'>
				Sign In
			</Button>
		</form>
	)
}

export default SigninForm
