import MarketplaceSidebar from '@/components/dashboard/MarketplaceSidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dashboard | Content Offerings',
	description: 'Dashboard for Content Offerings',
}

const Dashboard = () => {
	return (
		<div className='grid grid-cols-1 gap-8 p-8 md:grid-cols-8'>
			<div className='col-span-2'>
				<MarketplaceSidebar />
			</div>
			<main className='col-span-6'>Dashboard</main>
		</div>
	)
}

export default Dashboard
