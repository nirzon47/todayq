import { useSession } from 'next-auth/react'
import Link from 'next/link'

const HomeButtons = () => {
	const { status } = useSession()

	return (
		<div className='z-50 grid place-content-center'>
			{status === 'loading' ? (
				<p className='rounded-[8px] bg-white/70 px-16 py-4 text-lg font-medium duration-200 hover:bg-white'>
					Loading your experience
				</p>
			) : status === 'authenticated' ? (
				<Link href={'/dashboard'}>
					<button className='rounded-[8px] bg-white/70 px-16 py-4 text-lg font-medium duration-200 hover:bg-white'>
						Continue to Dashboard
					</button>
				</Link>
			) : (
				<Link href={'/auth/signin'}>
					<button className='rounded-[8px] bg-white/70 px-16 py-4 text-lg font-medium duration-200 hover:bg-white'>
						Sign in or Join now
					</button>
				</Link>
			)}
		</div>
	)
}

export default HomeButtons
