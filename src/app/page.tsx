'use client'

import HomeButtons from '@/components/home/HomeButtons'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { SessionProvider } from 'next-auth/react'

const App = () => {
	return (
		<SessionProvider>
			<AuroraBackground>
				<div className='grid place-content-center p-4'>
					<h1 className='mb-12 text-center text-5xl font-bold text-black dark:text-white'>
						Welcome to <br /> Content Marketplace
					</h1>
					<HomeButtons />
				</div>
			</AuroraBackground>
		</SessionProvider>
	)
}

export default App
