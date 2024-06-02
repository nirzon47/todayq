'use client'

import { ItemType } from '@/lib/types'
import axios from 'axios'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import DashboardItems from './DashboardItems'
import { useToast } from '../ui/use-toast'

const Dashboard = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const [data, setData] = useState<ItemType[]>([])
	const [filteredData, setFilteredData] = useState<ItemType[]>([])

	const { toast } = useToast()

	const getData = useCallback(async () => {
		try {
			setLoading(true)

			const { data } = await axios.get('/api/content')

			setData(data.contents)
			setFilteredData(data.contents)
		} catch (error: Error | any) {
			toast({
				title: 'Error',
				description: error.message || 'Something went wrong',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}, [toast])

	useEffect(() => {
		getData()
	}, [getData])

	return (
		<div className='grid grid-cols-1 gap-8 p-8 md:grid-cols-8'>
			<div className='col-span-2'>Sidebar</div>
			<main className='col-span-6'>
				{loading && (
					<div className='grid h-96 w-full place-content-center'>
						<Image src={'/loader.svg'} alt='wip' width={128} height={128} />
					</div>
				)}
				{!loading && data.length > 0 && (
					<div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
						<DashboardItems data={filteredData} />
					</div>
				)}
			</main>
		</div>
	)
}

export default Dashboard
