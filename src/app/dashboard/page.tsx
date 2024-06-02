import Dashboard from '@/components/dashboard/Dashboard'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dashboard | Content Offerings',
	description: 'Dashboard for Content Offerings',
}

const DashboardPage = () => {
	return <Dashboard />
}

export default DashboardPage
