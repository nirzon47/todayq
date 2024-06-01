import Add from '@/components/dashboard/Add'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Add Content | Content Offerings',
	description: 'Add content for your business',
}

const AddOffering = () => {
	return <Add />
}

export default AddOffering
