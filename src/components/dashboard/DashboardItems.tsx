import { ItemType } from '@/lib/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import Link from 'next/link'
import { LuPlusCircle } from 'react-icons/lu'

const DashboardItems = ({ data }: { data: ItemType[] }) => {
	return (
		<>
			{data.map((item) => (
				<Link href={`/dashboard/item/${item._id}`} key={item._id}>
					<Card className='duration-200 hover:scale-[1.02] hover:bg-secondary'>
						<CardHeader>
							<CardTitle>{item.name}</CardTitle>
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
