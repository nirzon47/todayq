import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ContentOfferingFormType } from '@/lib/zod'
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { useToast } from '@/components/ui/use-toast'
import { Checkbox } from '@/components/ui/checkbox'

const checkboxes = [
	{
		label: 'Google Index',
		value: 'google-index',
	},
	{
		label: 'Social Share',
		value: 'social-share',
	},
	{
		label: 'Homepage Placement',
		value: 'homepage-placement',
	},
	{
		label: 'Gambling',
		value: 'gambling',
	},
]

const SecondForm = ({
	contentOfferingForm,
	setContentOfferingForm,
	setFormProgress,
	offeringCategory,
	setOfferingCategory,
	allContentForms,
	setAllContentForms,
}: {
	contentOfferingForm: z.infer<typeof ContentOfferingFormType>
	setContentOfferingForm: React.Dispatch<
		React.SetStateAction<z.infer<typeof ContentOfferingFormType>>
	>
	setFormProgress: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>
	offeringCategory:
		| 'press-release'
		| 'sponsored'
		| 'sponsored-with-aggregators'
		| 'newsletter'
		| 'social-media'
		| 'review-article'
		| ''
	setOfferingCategory: React.Dispatch<
		React.SetStateAction<
			| 'press-release'
			| 'sponsored'
			| 'sponsored-with-aggregators'
			| 'newsletter'
			| 'social-media'
			| 'review-article'
			| ''
		>
	>
	allContentForms: [z.infer<typeof ContentOfferingFormType>]
	setAllContentForms: React.Dispatch<
		React.SetStateAction<[z.infer<typeof ContentOfferingFormType>]>
	>
}) => {
	const { toast } = useToast()

	const handleNextButton = () => {
		if (!ContentOfferingFormType.safeParse(contentOfferingForm).success) {
			toast({
				title: 'Error',
				description: 'Please fill all the fields correctly.',
				variant: 'destructive',
			})

			return
		}

		setFormProgress(2)
		if (offeringCategory) {
			const newArray = allContentForms
			newArray.push({
				...contentOfferingForm,
				category: offeringCategory!,
			})

			setAllContentForms(newArray)
		}
		setOfferingCategory('')
	}

	const handleAddMore = () => {
		if (!ContentOfferingFormType.safeParse(contentOfferingForm).success) {
			toast({
				title: 'Error',
				description: 'Please fill all the fields correctly.',
				variant: 'destructive',
			})

			return
		}

		if (offeringCategory) {
			const newArray = allContentForms
			newArray.push({
				...contentOfferingForm,
				category: offeringCategory!,
			})

			setAllContentForms(newArray)
		}
		setContentOfferingForm({
			category: '',
			price: 0,
			discountedPrice: 0,
			features: [],
		})
		setOfferingCategory('')
	}

	return (
		<motion.div
			className='grid gap-4'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
		>
			<div className='grid grid-cols-2 gap-4'>
				<div className='grid gap-2'>
					<Label htmlFor='price' className='truncate'>
						Media Kit Price ($)
					</Label>
					<Input
						id='price'
						type='number'
						placeholder='0'
						value={contentOfferingForm.price ? contentOfferingForm.price : ''}
						onChange={(e) =>
							setContentOfferingForm({
								...contentOfferingForm,
								price: Number(e.target.value),
							})
						}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='discounted-price'>Discounted Price</Label>
					<Input
						id='discounted-price'
						type='number'
						placeholder='0'
						value={
							contentOfferingForm.discountedPrice
								? contentOfferingForm.discountedPrice
								: ''
						}
						onChange={(e) =>
							setContentOfferingForm({
								...contentOfferingForm,
								discountedPrice: Number(e.target.value),
							})
						}
					/>
				</div>
			</div>
			<div className='grid gap-4'>
				<Label htmlFor='features' className='truncate'>
					Features
				</Label>
				<div className='grid gap-4'>
					{checkboxes.map((checkbox) => (
						<div key={checkbox.value} className='flex gap-2'>
							<Checkbox
								{...checkbox}
								checked={contentOfferingForm.features?.includes(checkbox.value)}
								onCheckedChange={(checked) => {
									if (checked) {
										setContentOfferingForm({
											...contentOfferingForm,
											features: [
												...(contentOfferingForm.features || []),
												checkbox.value,
											],
										})
									} else {
										setContentOfferingForm({
											...contentOfferingForm,
											features: contentOfferingForm.features?.filter(
												(feature) => feature !== checkbox.value,
											),
										})
									}
								}}
							/>
							<Label htmlFor={checkbox.value}>{checkbox.label}</Label>
						</div>
					))}
				</div>
			</div>
			<div className='grid grid-cols-3 gap-4'>
				<Button
					variant={'outline'}
					className='col-start-3'
					onClick={handleAddMore}
				>
					Add more offerings +
				</Button>
			</div>
			<div className='h-px bg-secondary'></div>

			<p className='text-xs text-zinc-500'>
				If this is the last content, click next
			</p>

			<div className='my-4 grid grid-cols-2 gap-2'>
				<Button onClick={() => setFormProgress(0)}>Previous</Button>
				<Button onClick={handleNextButton}>Next</Button>
			</div>
		</motion.div>
	)
}

export default SecondForm
