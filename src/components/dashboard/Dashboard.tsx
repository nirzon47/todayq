'use client'

import { ItemType } from '@/lib/types'
import axios from 'axios'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import DashboardItems from './DashboardItems'
import { useToast } from '../ui/use-toast'
import { Card } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'

const Dashboard = () => {
	const [loading, setLoading] = useState<boolean>(false)

	const [data, setData] = useState<ItemType[]>([])
	const [filteredData, setFilteredData] = useState<ItemType[]>([])
	const [activeFilters, setActiveFilters] = useState<string[]>([
		'content-distribution',
		'advertisement',
	])

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

	const handleFilter = (f: string, checked: string | boolean) => {
		let newActiveFilters = [...activeFilters]
		if (checked) {
			newActiveFilters.push(f)
		} else {
			newActiveFilters = newActiveFilters.filter((f1) => f1 !== f)
		}

		console.log(newActiveFilters)

		setActiveFilters(newActiveFilters)
		const newData = data.filter((item) =>
			newActiveFilters.includes(item.category),
		)

		setFilteredData(newData)
	}

	useEffect(() => {
		getData()
	}, [getData])

	return (
		<div className='grid grid-cols-1 gap-8 p-8 md:grid-cols-8'>
			<div className='lg:col-span-2'>
				<Card className='grid gap-4 p-4'>
					<h3 className='text-lg font-semibold'>Filters:</h3>
					<div className='flex items-center gap-2'>
						<Checkbox
							id='content-distribution-filter'
							value={'content-distribution'}
							onCheckedChange={(checked: boolean) => {
								handleFilter('content-distribution', checked)
							}}
							defaultChecked
						/>
						<Label htmlFor='content-distribution-filter'>
							Content Distribution
						</Label>
					</div>
					<div className='flex items-center gap-2'>
						<Checkbox
							id='advertisements-filter'
							value={'advertisement'}
							onCheckedChange={(checked) =>
								handleFilter('advertisement', checked)
							}
							defaultChecked
						/>
						<Label htmlFor='advertisements-filter'>Advertisements</Label>
					</div>
				</Card>
			</div>
			<main className='lg:col-span-6'>
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
