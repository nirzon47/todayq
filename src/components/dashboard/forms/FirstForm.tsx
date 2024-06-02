import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Button } from '@/components/ui/button'
import { OfferingFormType } from '@/lib/zod'
import { z } from 'zod'
import { Label } from '@/components/ui/label'
import { motion } from 'framer-motion'
import { useToast } from '@/components/ui/use-toast'

const FirstForm = ({
	offeringForm,
	setOfferingForm,
	setFormProgress,
	category,
	setCategory,
}: {
	offeringForm: z.infer<typeof OfferingFormType>
	setOfferingForm: React.Dispatch<
		React.SetStateAction<z.infer<typeof OfferingFormType>>
	>
	setFormProgress: React.Dispatch<React.SetStateAction<0 | 1 | 2 | 3>>
	category: 'content-distribution' | 'advertisement' | ''
	setCategory: React.Dispatch<
		React.SetStateAction<'content-distribution' | 'advertisement' | ''>
	>
}) => {
	const { toast } = useToast()

	const handleNextButton = () => {
		if (!OfferingFormType.safeParse(offeringForm).success) {
			toast({
				title: 'Error',
				description: 'Please fill all the fields correctly.',
				variant: 'destructive',
			})

			return
		}

		setFormProgress(1)
		if (category) {
			setOfferingForm({ ...offeringForm, category: category! })
		}
		setCategory('')
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
					<Label htmlFor='website-name' className='truncate'>
						Website Name
					</Label>
					<Input
						id='website-name'
						placeholder='Nirzon Karmakar'
						value={offeringForm.name}
						onChange={(e) =>
							setOfferingForm({ ...offeringForm, name: e.target.value })
						}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='website-url'>Website URL</Label>
					<Input
						id='website-url'
						placeholder='https://nirzonkarmakar.com'
						value={offeringForm.url}
						onChange={(e) =>
							setOfferingForm({ ...offeringForm, url: e.target.value })
						}
					/>
				</div>
			</div>
			<div className='grid gap-2'>
				<Label htmlFor='website-desc'>Website Description</Label>
				<Textarea
					id='website-desc'
					placeholder="Nirzon Karmakar's website"
					value={offeringForm.desc}
					onChange={(e) =>
						setOfferingForm({ ...offeringForm, desc: e.target.value })
					}
				/>
			</div>
			<div className='grid grid-cols-2 gap-4'>
				<div className='grid gap-2'>
					<Label htmlFor='email' className='truncate'>
						Official Email
					</Label>
					<Input
						id='email'
						type='email'
						placeholder='nirzonk47@gmail.com'
						value={offeringForm.email}
						onChange={(e) =>
							setOfferingForm({ ...offeringForm, email: e.target.value })
						}
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='telegram'>Telegram ID</Label>
					<Input
						id='telegram'
						placeholder='@nirzonkarmakar'
						value={offeringForm.telegram}
						onChange={(e) =>
							setOfferingForm({ ...offeringForm, telegram: e.target.value })
						}
					/>
				</div>
			</div>
			<h2 className='text-xl font-medium'>Allowed Content</h2>
			<div className='grid gap-2'>
				<h3 className='font-medium'>Gambling</h3>
				<RadioGroup
					defaultValue='false'
					className='flex gap-12'
					onValueChange={(e) =>
						setOfferingForm({ ...offeringForm, gambling: e === 'true' })
					}
				>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='true' id='gambling-allowed' />
						<Label htmlFor='gambling-allowed'>Yes</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='false' id='gambling-not-allowed' />
						<Label htmlFor='gambling-not-allowed'>No</Label>
					</div>
				</RadioGroup>
			</div>
			<div className='grid gap-2'>
				<h3 className='font-medium'>Adult Content</h3>
				<RadioGroup
					defaultValue='false'
					className='flex gap-12'
					onValueChange={(e) =>
						setOfferingForm({ ...offeringForm, adult: e === 'true' })
					}
				>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='true' id='adult-content-allowed' />
						<Label htmlFor='adult-content-allowed'>Yes</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='false' id='adult-content-not-allowed' />
						<Label htmlFor='adult-content-not-allowed'>No</Label>
					</div>
				</RadioGroup>
			</div>
			<div className='grid gap-2'>
				<h3 className='font-medium'>Web3/Crypto Content</h3>
				<RadioGroup
					defaultValue='false'
					className='flex gap-12'
					onValueChange={(e) =>
						setOfferingForm({ ...offeringForm, web3: e === 'true' })
					}
				>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='true' id='crypto-allowed' />
						<Label htmlFor='crypto-allowed'>Yes</Label>
					</div>
					<div className='flex items-center space-x-2'>
						<RadioGroupItem value='false' id='crypto-not-allowed' />
						<Label htmlFor='crypto-not-allowed'>No</Label>
					</div>
				</RadioGroup>
			</div>
			<div className='my-4 grid grid-cols-2 gap-2'>
				<Button onClick={handleNextButton}>Next</Button>
			</div>
		</motion.div>
	)
}

export default FirstForm
