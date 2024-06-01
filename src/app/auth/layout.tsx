'use client'

import { SessionProvider } from 'next-auth/react'
import Image from 'next/image'

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<SessionProvider>
			<div className='relative h-screen w-screen bg-gradient-to-r from-black to-blue-950'>
				<div className='absolute inset-0 z-50 grid h-screen place-content-center p-4'>
					{children}
				</div>
				<Image
					src={'/auth-bg.svg'}
					alt='bg'
					width={2160}
					height={1440}
					className='absolute bottom-0 z-0 opacity-50'
				/>
			</div>
		</SessionProvider>
	)
}

export default AuthLayout
