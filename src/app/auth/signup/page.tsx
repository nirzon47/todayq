import Link from 'next/link'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import AuthProviderButtons from '@/components/auth/AuthProviderButtons'
import SignupForm from '@/components/auth/SignupForm'

export const metadata = {
	title: 'Sign Up | Content Offerings',
	description: 'Sign up for an account in Content Offerings',
}

const Signup = () => {
	return (
		<Card className='mx-auto max-w-sm'>
			<CardHeader>
				<CardTitle className='text-xl'>Sign Up</CardTitle>
				<CardDescription>
					Enter your information to create an account
				</CardDescription>
			</CardHeader>
			<CardContent>
				<SignupForm />
				<AuthProviderButtons />
				<div className='mt-4 text-center text-sm'>
					Already have an account?{' '}
					<Link href='/auth/signin' className='underline'>
						Sign in
					</Link>
				</div>
			</CardContent>
		</Card>
	)
}

export default Signup
