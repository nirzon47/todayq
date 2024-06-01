'use client'

import { Button } from '../ui/button'
import { FaGithub, FaGoogle } from 'react-icons/fa6'
import { signIn } from 'next-auth/react'

const AuthProviderButtons = () => {
	return (
		<div className='flex items-center justify-between gap-2'>
			<Button
				variant='outline'
				size={'lg'}
				className='w-full'
				aria-label='Google Sign in'
				onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
			>
				<FaGoogle className='text-lg' />
			</Button>
			<Button
				variant='outline'
				size={'lg'}
				className='w-full'
				aria-label='Github Sign in'
				onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
			>
				<FaGithub className='text-lg' />
			</Button>
		</div>
	)
}

export default AuthProviderButtons
