import Link from 'next/link'
import { FaShop } from 'react-icons/fa6'
import ProfileSection from './ProfileSection'

const Header = () => {
	return (
		<header className='sticky top-0 flex h-16 items-center justify-between bg-zinc-900 p-4 text-white md:p-8'>
			<Link href={'/'} className='flex items-center gap-2'>
				<FaShop className='text-2xl' />
				<h2 className='font-semibold'>CO</h2>
			</Link>
			<Link href={'/dashboard'}>
				<h2 className='bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-lg font-bold text-transparent'>
					Marketplace
				</h2>
			</Link>
			<ProfileSection />
		</header>
	)
}

export default Header
