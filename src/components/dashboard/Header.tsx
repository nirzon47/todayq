import Link from 'next/link'
import { FaBars, FaShop } from 'react-icons/fa6'
import ProfileSection from './ProfileSection'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const links = [
	{
		name: 'Marketplace',
		href: '/dashboard',
	},
	{
		name: 'Add Product',
		href: '/dashboard/add',
	},
]

const Header = () => {
	return (
		<header className='sticky top-0 flex h-16 items-center justify-between bg-zinc-900 p-4 text-white md:p-8'>
			<div className='flex gap-6'>
				<Sheet>
					<SheetTrigger className='md:hidden'>
						<FaBars className='text-2xl' />
					</SheetTrigger>
					<SheetContent side={'left'}>
						<div className='flex flex-col gap-4'>
							<Links />
						</div>
					</SheetContent>
				</Sheet>
				<Link href={'/'} className='flex items-center gap-2'>
					<FaShop className='text-2xl' />
					<h2 className='hidden font-semibold md:inline-block'>CO</h2>
				</Link>
			</div>
			<div className='hidden items-center gap-12 md:flex'>
				<Links />
			</div>
			<ProfileSection />
		</header>
	)
}

const Links = () => {
	const pathname = usePathname()

	return (
		<>
			{links.map((link) => (
				<Link key={link.href} href={link.href}>
					<h2
						className={cn(
							'text-lg font-bold',
							pathname === link.href &&
								'bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent',
						)}
					>
						{link.name}
					</h2>
				</Link>
			))}
		</>
	)
}

export default Header
