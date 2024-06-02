import connectDB from '@/lib/db'
import { contentModel } from '@/models/content.model'

export const GET = async (
	req: Request,
	{ params }: { params: { id: string } },
) => {
	const id = params.id[0]

	await connectDB()

	const content = await contentModel.findOne({ _id: id })

	return Response.json({
		success: true,
		message: 'Content fetched successfully',
		content,
	})
}
