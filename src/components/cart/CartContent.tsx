'use client'

import Image from 'next/image'
import { CardContent, CardFooter } from '../ui/card'
import { useCallback, useEffect, useState } from 'react'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import Link from 'next/link'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { ItemType } from '@/lib/types'
import { LuX } from 'react-icons/lu'
import { useRouter } from 'next/navigation'
import Script from 'next/script'

const CartContent = () => {
	const [cart, setCart] = useState<any>()
	const { toast } = useToast()
	const [total, setTotal] = useState(0)
	const [loading, setLoading] = useState<boolean>(false)

	const { data: session, status } = useSession()
	const router = useRouter()

	const getCart = useCallback(async () => {
		try {
			setLoading(true)

			// @ts-ignore
			const { data } = await axios.get(`/api/cart/${session?.user?.id}`)

			setCart(data.cart.contents)

			const total = data.cart.contents.reduce(
				(acc: number, content: ItemType) =>
					content.contentOffering[0].discountedPrice + acc,
				0,
			)

			setTotal(total)
		} catch (error: Error | any) {
			toast({
				title: 'Error',
				description: error.response.data.message || 'Something went wrong',
				variant: 'destructive',
			})
		} finally {
			setLoading(false)
		}
		// @ts-ignore
	}, [session?.user?.id, toast])

	const handleRemoveItem = async (id: string) => {
		try {
			const { data } = await axios.patch(`/api/cart/${id}`, {
				// @ts-ignore
				user: session?.user?.id,
			})

			toast({
				title: 'Success',
				description: data.message || 'Item removed from cart',
				variant: 'default',
			})

			getCart()
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Error removing item from cart',
				variant: 'destructive',
			})
		}
	}

	const handleCheckout = async () => {
		try {
			const { data } = await axios.post('/api/order', {
				// @ts-ignore
				user: session?.user?.id,
			})

			// Payment options
			const options = {
				key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
				amount: data.order.total * 100,
				currency: 'INR',
				name: 'TodayQ Assignment',
				description: 'Content Purchase',
				image: '/logo.png',
				order_id: data._id,
				handler: async (res: any) => {
					const { data: verifiedData } = await axios.post(`/api/order/verify`, {
						_id: data.order._id,
						razorpay_payment_id: res.razorpay_payment_id,
					})

					toast({
						title: 'Success',
						description: 'Content purchased successfully',
					})

					setCart([])
					setTotal(0)
				},
			}

			// @ts-ignore
			const paymentObject = new window.Razorpay(options)

			// Handles payment errors
			paymentObject.on('payment.failed', () => {
				toast({
					title: 'Error',
					description: 'Something went wrong. Please try again.',
					variant: 'destructive',
				})
			})

			paymentObject.open()
		} catch (error: Error | any) {
			toast({
				title: 'Error',
				description: error.message || 'Something went wrong. Please try again.',
				variant: 'destructive',
			})
		}
	}

	useEffect(() => {
		if (status !== 'authenticated') {
			router.push('/auth/signin')
		} else {
			getCart()
		}
	}, [getCart, status, router])

	return (
		<>
			<Script
				id='razorpay-checkout-js'
				src='https://checkout.razorpay.com/v1/checkout.js'
			/>
			<CardContent>
				{loading && (
					<div className='flex h-96 items-center justify-center'>
						<Image src={'/loader.svg'} alt='loading' width={128} height={128} />
					</div>
				)}
				{!cart && !loading && (
					<p className='flex h-24 items-center justify-center text-center text-sm'>
						Cart is empty
					</p>
				)}
				{status === 'authenticated' &&
					!loading &&
					cart &&
					cart?.map((item: ItemType) => (
						<div key={item._id}>
							<div className='grid gap-4'>
								<div className='grid items-center gap-4 md:grid-cols-[160px_1fr_auto]'>
									<div className='grid gap-1'>
										<h3 className='font-medium'>{item.name}</h3>
										<p className='max-w-52 truncate text-sm text-gray-500 dark:text-gray-400'>
											{item.desc}
										</p>
									</div>
									<div className='md:pl-4'>
										<p className='text-sm capitalize text-primary'>
											{item.contentOffering[0].category.split('-').join(' ')}{' '}
											Content
										</p>
									</div>
									<div className='flex items-center gap-4 md:text-right'>
										<p className='font-bold'>
											$ {item.contentOffering[0].discountedPrice}
										</p>
										<LuX
											className='cursor-pointer text-lg duration-200 hover:text-red-500'
											onClick={() => handleRemoveItem(item._id)}
										/>
									</div>
								</div>
							</div>
							<div className='my-4 h-px bg-secondary'></div>
						</div>
					))}
				{!loading && (
					<CardFooter className='flex flex-col items-center justify-between gap-6 md:flex-row'>
						<div className='text-lg font-medium'>
							Total:&nbsp;&nbsp;$ {total}
						</div>
						<div className='flex flex-wrap items-center justify-center gap-2'>
							<Link href={'/dashboard'}>
								<Button variant='outline'>Continue Browsing</Button>
							</Link>
							<Button onClick={handleCheckout}>Proceed to Checkout</Button>
						</div>
					</CardFooter>
				)}
				<div className='my-4 h-px bg-secondary'></div>
				<p className='text-xs text-zinc-500'>
					Your payments will be converted to INR to process within Demo Razorpay
					limits.
				</p>
				<p className='text-xs text-zinc-500'>
					Use JioMoney to test your payment easily.
				</p>
			</CardContent>
		</>
	)
}

export default CartContent
