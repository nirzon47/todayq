import { z } from 'zod'
import { ContentOfferingFormType, OfferingFormType } from '@/lib/zod'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

const ReviewForm = ({
	offeringForm,
	allContentForms,
	setFormProgress,
}: {
	offeringForm: z.infer<typeof OfferingFormType>
	allContentForms: [z.infer<typeof ContentOfferingFormType>]
	setFormProgress: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>
}) => {
	const { toast } = useToast()
	const router = useRouter()

	const handleCreate = async () => {
		try {
			const { data } = await axios.post('/api/content', {
				...offeringForm,
				contentOffering: allContentForms,
			})

			toast({
				title: 'Success',
				description: data.message,
				variant: 'default',
			})

			router.push('/dashboard')
		} catch (error: Error | any) {
			toast({
				title: 'Error',
				description: error.message || 'Something went wrong',
				variant: 'destructive',
			})
		}
	}

	return (
		<div className='grid gap-4'>
			<div>
				<h2 className='inline bg-gradient-to-r from-zinc-950 to-zinc-600 bg-clip-text text-xl font-bold text-transparent dark:from-zinc-400 dark:to-white'>
					Offering
				</h2>
			</div>
			<div className='grid gap-4'>
				<div className='grid gap-2'>
					<p className='font-semibold'>Category</p>
					<p className='capitalize text-primary'>{offeringForm.category}</p>
				</div>
				<div className='grid gap-2'>
					<p className='font-semibold'>Website Name</p>
					<p className='text-primary'>{offeringForm.name}</p>
				</div>
				<div className='grid gap-2'>
					<p className='font-semibold'>Website URL</p>
					<p className='text-primary'>{offeringForm.url}</p>
				</div>
			</div>
			<div className='grid gap-2'>
				<p className='font-semibold'>Email</p>
				<p className='text-primary'>{offeringForm.email}</p>
			</div>
			<div className='grid gap-2'>
				<p className='font-semibold'>Telegram</p>
				<p className='text-primary'>{offeringForm.telegram}</p>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<div className='grid gap-2'>
					<p className='font-semibold'>Gambling</p>
					<p className='text-primary'>{offeringForm.gambling ? 'Yes' : 'No'}</p>
				</div>
				<div className='grid gap-2'>
					<p className='font-semibold'>Adult</p>
					<p className='text-primary'>{offeringForm.adult ? 'Yes' : 'No'}</p>
				</div>
				<div className='grid gap-2'>
					<p className='font-semibold'>Web3</p>
					<p className='text-primary'>{offeringForm.web3 ? 'Yes' : 'No'}</p>
				</div>
			</div>

			<div className='my-4 h-px bg-secondary'></div>

			<div>
				<h2 className='-block bg-gradient-to-r from-zinc-950 to-zinc-600 bg-clip-text text-xl font-bold text-transparent dark:from-zinc-400 dark:to-white'>
					Content Offerings
				</h2>
			</div>

			{allContentForms.map((contentForm, index) => (
				<div className='grid gap-4' key={index}>
					<div className='grid gap-2'>
						<p className='font-semibold'>Category</p>
						<p className='capitalize text-primary'>{contentForm.category}</p>
					</div>
					<div className='grid grid-cols-2 gap-4'>
						<div className='grid gap-2'>
							<p className='font-semibold'>Price</p>
							<p className='text-primary'>{contentForm.price}</p>
						</div>
						<div className='grid gap-2'>
							<p className='font-semibold'>Discounted Price</p>
							<p className='text-primary'>{contentForm.discountedPrice}</p>
						</div>
					</div>
					<div className='grid gap-2'>
						<p className='font-semibold'>Features</p>
						<div className='text-primary'>
							{contentForm.features?.map((f) => (
								<p key={f} className='capitalize'>
									{f.split('-').join(' ')}
								</p>
							))}
						</div>
					</div>
				</div>
			))}

			<div className='grid grid-cols-2 gap-4'>
				<Button onClick={() => setFormProgress(1)}>Previous</Button>
				<Button variant={'outline'} onClick={handleCreate}>
					Create
				</Button>
			</div>
		</div>
	)
}

export default ReviewForm
