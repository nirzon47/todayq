import connectDB from '@/lib/db'
import { contentModel } from '@/models/content.model'

export const POST = async (req: Request) => {
	const data = await req.json()

	await connectDB()

	const content = await contentModel.create(data)

	return Response.json(
		{ success: true, message: 'Content created successfully', content },
		{ status: 201 },
	)
}
