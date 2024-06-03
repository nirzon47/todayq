import { ItemType } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { LuLink, LuPlusCircle } from 'react-icons/lu'
import Image from 'next/image'
import Avatar from 'boring-avatars'

const randomImages = [
	'Mary Baker',
	'Amelia Earhart',
	'Mary Roebling',
	'Sarah Winnemucca',
	'Margaret Brent',
	'Lucy Stone',
	'Mary Edwards',
	'Margaret Chase',
	'Mahalia Jackson',
	'Maya Angelou',
	'Margaret Bourke',
	'Eunice Kennedy',
	'Carrie Chapman',
	'Elizabeth Peratrovich',
	'Alicia Dickerson',
	'Daisy Gatson',
	'Abigail Adams',
	'Margaret Fuller',
	'Emma Lazarus',
	'Marian Anderson',
	'Virginia Apgar',
	'Mary Walton',
]

const DashboardItems = ({ data }: { data: ItemType[] }) => {
	return (
		<>
			{data.map((item) => (
				<Link href={`/dashboard/item/${item._id}`} key={item._id}>
					<Card className='relative duration-200 hover:scale-[1.02] hover:bg-secondary'>
						<a
							href={item.url}
							target='_blank'
							className='absolute right-4 top-4 z-10 flex items-center gap-4 text-xs text-purple-500 hover:underline'
						>
							<LuLink /> {item.url}
						</a>
						<CardHeader className='mt-4 flex flex-row items-center gap-4'>
							{item.image ? (
								<Image
									src={item.image}
									alt={item.name}
									width={64}
									height={64}
								/>
							) : (
								<Avatar
									size={64}
									name={
										randomImages[
											Math.floor(Math.random() * randomImages.length)
										]
									}
									variant='bauhaus'
									square={true}
									colors={[
										'#3B82F6',
										'#D077E5',
										'#FF77B8',
										'#FF9685',
										'#FFC864',
										'#F9F871',
									]}
								/>
							)}
							<CardTitle className='inline-block'>{item.name}</CardTitle>
						</CardHeader>
						<CardContent className='mt-16 flex items-center justify-between'>
							<div>
								<h2 className='text-xs'>Starting From</h2>
								<p className='text-xl font-semibold text-primary'>
									${item.contentOffering[0].discountedPrice}
								</p>
							</div>
							<LuPlusCircle className='text-2xl text-primary' />
						</CardContent>
					</Card>
				</Link>
			))}
		</>
	)
}

export default DashboardItems
