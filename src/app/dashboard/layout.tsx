'use client'

import Header from '@/components/dashboard/Header'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
	return (
		<SessionProvider>
			<div className='relative'>
				<Header />
				{children}
			</div>
		</SessionProvider>
	)
}

export default DashboardLayout
