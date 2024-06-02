'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { ItemType } from '@/lib/types'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { LuChevronLeft, LuShoppingCart } from 'react-icons/lu'

const ContentItemPage = ({ params }: { params: { id: string } }) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [data, setData] = useState<ItemType>()

	const router = useRouter()
	const { toast } = useToast()
	const { data: session, status } = useSession()

	// Get content data
	const getData = useCallback(async () => {
		try {
			setLoading(true)
			const { data } = await axios.get(`/api/content/${params.id}`)

			setData(data.content)
		} catch (error: Error | any) {
			toast({
				title: 'Error',
				description: error.message || 'Something went wrong',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
	}, [params, toast])

	// Add to cart
	const handleAddToCart = async () => {
		try {
			const { data } = await axios.post(`/api/cart/${params.id}`, {
				// @ts-ignore
				user: session?.user?.id,
			})

			toast({
				title: 'Success',
				description: data.message || 'Item added to cart',
				variant: 'default',
			})
		} catch (error: Error | any) {
			toast({
				title: 'Error',
				description: error.response.data.message || 'Something went wrong',
				variant: 'destructive',
			})
		}
	}

	useEffect(() => {
		getData()
	}, [getData])

	return (
		<div className='mx-auto max-w-4xl p-8'>
			<Button
				onClick={() => router.back()}
				className='mb-8 flex items-center gap-4'
				variant={'ghost'}
			>
				<LuChevronLeft />
				<span>Go back</span>
			</Button>
			{loading && (
				<div className='grid h-96 w-full place-content-center'>
					<Image src={'/loader.svg'} alt='wip' width={128} height={128} />
				</div>
			)}
			{!loading && data && (
				<div>
					<div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
						<Card className='grid gap-4 p-6'>
							<h1 className='text-2xl font-bold'>{data.name}</h1>
							<p className='text-sm opacity-80'>{data.desc}</p>
						</Card>
						<Card className='grid gap-2 p-6'>
							<table>
								<tbody>
									<tr>
										<th>Website</th>
										<td className='text-primary'>
											<a href={data.url} target='_blank'>
												{data.url}
											</a>
										</td>
									</tr>
									<tr>
										<th>Email</th>
										<td className='text-primary'>
											<a href={`mailto:${data.email}`}>{data.email}</a>
										</td>
									</tr>
									<tr>
										<th>Category</th>
										<td className='capitalize text-primary'>
											{data.category.split('-').join(' ')}
										</td>
									</tr>
									<tr>
										<th>Telegram</th>
										<td className='capitalize text-primary'>{data.telegram}</td>
									</tr>

									<tr>
										<th>Gambling</th>
										<td className='capitalize text-primary'>
											{data.gambling ? 'Yes' : 'No'}
										</td>
									</tr>

									<tr>
										<th>Adult</th>
										<td className='capitalize text-primary'>
											{data.adult ? 'Yes' : 'No'}
										</td>
									</tr>

									<tr>
										<th>Web3</th>
										<td className='capitalize text-primary'>
											{data.web3 ? 'Yes' : 'No'}
										</td>
									</tr>
								</tbody>
							</table>
						</Card>
					</div>
					<h2 className='my-6 px-4 text-xl font-semibold'>Content Offerings</h2>
					<Card className='grid gap-4 p-6'>
						<h3 className='mb-4 text-lg font-medium capitalize'>
							{data.contentOffering[0].category.split('-').join(' ')}
						</h3>
						<div>
							<h3 className='mb-2 text-lg font-medium'>Features</h3>
							{data.contentOffering[0].features.map((feature) => (
								<p key={feature} className='capitalize text-primary'>
									{feature.split('-').join(' ')}
								</p>
							))}
						</div>
						<div className='flex justify-between'>
							<p className='flex items-center gap-2'>
								<span>Price:</span>
								<span className='flex items-center gap-6'>
									{data.contentOffering[0].price ===
									data.contentOffering[0].discountedPrice ? (
										<span className='font-bold text-primary'>
											${data.contentOffering[0].price}
										</span>
									) : (
										<>
											<span className='line-through'>
												${data.contentOffering[0].price}
											</span>
											<span className='font-bold text-primary'>
												${data.contentOffering[0].discountedPrice}
											</span>
										</>
									)}
								</span>
							</p>
							{status === 'authenticated' ? (
								<Button
									className='flex items-center gap-2'
									onClick={handleAddToCart}
								>
									<LuShoppingCart />
									<span>Add to cart</span>
								</Button>
							) : (
								<Button
									onClick={() => router.push('/auth/signin')}
									variant='outline'
								>
									Sign in to add to cart
								</Button>
							)}
						</div>
					</Card>
				</div>
			)}
		</div>
	)
}

export default ContentItemPage
