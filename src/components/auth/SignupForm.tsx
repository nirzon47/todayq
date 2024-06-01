'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SignupFormType } from '@/lib/zod'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import { useToast } from '../ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const SignupForm = () => {
	// Form state
	const [form, setForm] = useState<z.infer<typeof SignupFormType>>({
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
	})
	// Loading state
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const { toast } = useToast()
	const router = useRouter()

	const { status } = useSession()

	const handleFormSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		// Validation
		if (!SignupFormType.safeParse(form).success) {
			toast({
				title: 'Error',
				description:
					'Please fill in all fields correctly. Confirm that the passwords match.',
				variant: 'destructive',
			})

			return
		}

		try {
			setIsLoading(true)
			const { data } = await axios.post('/api/auth/user', form)

			if (data.success) {
				toast({
					title: 'Success',
					description:
						'Account created successfully. Redirecting you to sign in page.',
				})

				// Reset form
				setForm({
					name: '',
					email: '',
					password: '',
					confirmPassword: '',
				})

				setTimeout(() => {
					router.push('/auth/signin')
				}, 2000)
			} else {
				throw new Error(data.message)
			}
		} catch (error: Error | any) {
			toast({
				title: 'Error',
				description: error.message || 'Something went wrong',
				variant: 'destructive',
			})
		} finally {
			setIsLoading(false)
		}
	}

	// Handle inputs
	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, name: e.target.value })
	}

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, email: e.target.value })
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, password: e.target.value })
	}

	const handleConfirmPasswordChange = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setForm({ ...form, confirmPassword: e.target.value })
	}

	useEffect(() => {
		// Redirects user to home page if authenticated
		if (status === 'authenticated') {
			router.push('/')
		}
	}, [status, router])

	return (
		<form className='mb-4 grid gap-4' onSubmit={handleFormSubmission}>
			<div className='grid gap-2'>
				<Label htmlFor='name'>Name</Label>
				<Input
					id='name'
					placeholder='John Doe'
					required
					onChange={handleNameChange}
				/>
			</div>
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
			<div className='grid grid-cols-2 gap-2'>
				<div className='grid gap-2'>
					<Label htmlFor='password'>Password</Label>
					<Input
						id='password'
						type='password'
						required
						onChange={handlePasswordChange}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='confirm-password' className='truncate'>
						Confirm Password
					</Label>
					<Input
						id='confirm-password'
						type='password'
						required
						onChange={handleConfirmPasswordChange}
					/>
				</div>
			</div>
			{isLoading && (
				<div className='grid place-content-center'>
					<Image
						src={'/loader.svg'}
						alt='loading'
						width={200}
						height={50}
						className='h-10'
					/>
				</div>
			)}
			<Button type='submit' className='w-full' disabled={isLoading}>
				Create an account
			</Button>
		</form>
	)
}

export default SignupForm
