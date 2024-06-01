import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { LuCheckCircle, LuCircle } from 'react-icons/lu'

const AddSidebar = ({ progress }: { progress: 0 | 1 | 2 | 3 }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Add Product</CardTitle>
			</CardHeader>
			<CardContent>
				<div className='flex items-center gap-2'>
					{progress === 0 ? (
						<LuCircle className='text-green-500' />
					) : (
						<LuCheckCircle className='text-green-500' />
					)}
					<p>Add Offering</p>
				</div>
				<div className='flex items-center gap-2'>
					{progress < 2 ? (
						<LuCircle className='text-green-500' />
					) : (
						<LuCheckCircle className='text-green-500' />
					)}
					<p>Add Content Offerings</p>
				</div>
				<div className='flex items-center gap-2'>
					{progress < 3 ? (
						<LuCircle className='text-green-500' />
					) : (
						<LuCheckCircle className='text-green-500' />
					)}
					<p>Review</p>
				</div>
			</CardContent>
		</Card>
	)
}

export default AddSidebar
