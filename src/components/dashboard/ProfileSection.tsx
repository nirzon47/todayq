'use client'

import { signOut, useSession } from 'next-auth/react'
import { Avatar } from '../ui/avatar'
import { AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../ui/button'
import Link from 'next/link'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'

const ProfileSection = () => {
	const { data: session, status } = useSession()

	return (
		<div>
			{status === 'loading' ? (
				<Image src='/loader.svg' alt='loader' width={30} height={30} />
			) : status === 'authenticated' ? (
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar className='h-8 w-8'>
							<AvatarImage
								src={session?.user?.image as string}
								alt='session.name'
							/>
							<AvatarFallback className='grid h-8 w-8 place-content-center bg-black'>
								{session.user?.name?.charAt(0)}
							</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<Link href={'/dashboard/orders'}>
							<DropdownMenuItem className='cursor-pointer'>
								Order History
							</DropdownMenuItem>
						</Link>
						<Link href={'/dashboard/cart'}>
							<DropdownMenuItem className='cursor-pointer'>
								Cart
							</DropdownMenuItem>
						</Link>
						<Link href={'/dashboard/wip'}>
							<DropdownMenuItem className='cursor-pointer'>
								Team
							</DropdownMenuItem>
						</Link>
						<Link href={'/dashboard/wip'}>
							<DropdownMenuItem className='cursor-pointer'>
								Subscription
							</DropdownMenuItem>
						</Link>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							onClick={() => signOut({ callbackUrl: '/' })}
							className='cursor-pointer text-red-500'
						>
							Sign out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Link href={'/auth/signin'}>
					<Button>Sign in</Button>
				</Link>
			)}
		</div>
	)
}

export default ProfileSection
