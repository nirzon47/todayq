'use client'

import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '../ui/card'
import { LuCheck, LuClock, LuHash } from 'react-icons/lu'
import { OrderType } from '@/lib/types'

const OrderHistory = () => {
	const [loading, setLoading] = useState<boolean>(false)
	const [data, setData] = useState<OrderType[]>()

	const { data: session, status } = useSession()
	const { toast } = useToast()

	const getData = useCallback(async () => {
		try {
			setLoading(true)
			// @ts-ignore
			const { data } = await axios.get(`/api/orders/${session?.user?.id}`)

			setData(data.orders)
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Error fetching order history',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
		// @ts-ignore
	}, [session?.user?.id, toast])

	useEffect(() => {
		getData()
	}, [getData])

	return (
		<>
			{status === 'loading' && (
				<div className='flex h-96 justify-center'>
					<Image src='/loader.svg' alt='loader' width={30} height={30} />
				</div>
			)}

			{(status === 'authenticated' || status !== 'loading') && (
				<>
					<h1 className='mx-auto mb-8 max-w-3xl text-3xl font-bold'>
						Order History
					</h1>
					<div className='grid grid-cols-1 gap-4'>
						{data &&
							data.map((item: OrderType) => (
								<Card key={item._id}>
									<CardHeader>
										<CardTitle className='mb-1 flex flex-wrap items-center justify-between gap-2'>
											<span className='flex items-center gap-4'>
												Order ID{' '}
												<span className='flex items-center gap-1 text-primary'>
													<LuHash size={20} />
													{item._id.substring(16)}
												</span>
											</span>
											<span className='flex items-center gap-2 font-normal'>
												<LuClock size={20} /> Created on:{' '}
												{new Date(item.created).toLocaleDateString()}
											</span>
										</CardTitle>
										<CardDescription className='mt-4'>
											{item.contents.map((content) => (
												<p key={content._id} className='capitalize'>
													{content.category.split('-').join(' ')} from{' '}
													<span className='text-primary'>{content.name}</span>
												</p>
											))}
										</CardDescription>
									</CardHeader>
									<CardContent className='grid gap-6'>
										<div className='flex justify-between'>
											<p>Total: ${item.total}</p>
											<p className='flex items-center gap-2'>
												Payment Status:{' '}
												{item.status === 'completed' ? (
													<LuCheck color='green' />
												) : (
													<LuClock color='yellow' />
												)}
											</p>
										</div>
									</CardContent>
								</Card>
							))}
					</div>
				</>
			)}
		</>
	)
}

export default OrderHistory
