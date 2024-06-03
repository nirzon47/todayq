import connectDB from '@/lib/db'
import { cartModel } from '@/models/cart.model'
import { contentModel } from '@/models/content.model'

// Add item to cart
export const POST = async (
	req: Request,
	{ params }: { params: { id: string } },
) => {
	await connectDB()

	const { user } = await req.json()

	const content = await contentModel.findOne({ _id: params.id })
	if (!content) {
		return Response.json(
			{ success: false, message: 'Content not found' },
			{ status: 404 },
		)
	}

	const cart = await cartModel.findOne({ user })

	// If cart already exists, add item to cart
	if (cart) {
		if (cart.contents.some((item: any) => item.toString() == params.id)) {
			return Response.json(
				{ success: false, message: 'Item already in cart' },
				{ status: 409 },
			)
		}

		await cartModel.updateOne(
			{ _id: cart._id },
			{ $push: { contents: params.id } },
		)
		return Response.json(
			{ success: true, message: 'Item added to cart' },
			{ status: 200 },
		)
	}

	// If cart doesn't exist, create new cart
	const newCart = await cartModel.create({
		user,
		contents: [params.id],
	})
	return Response.json(
		{
			success: true,
			message: 'Item added to cart',
			newCart,
		},
		{ status: 200 },
	)
}

// Remove item from cart
export const PATCH = async (
	req: Request,
	{ params }: { params: { id: string } },
) => {
	await connectDB()

	const { user } = await req.json()

	const cart = await cartModel.findOne({ user })
	// If cart doesn't exist, return error
	if (!cart) {
		return Response.json(
			{ success: false, message: 'Cart not found' },
			{ status: 404 },
		)
	}

	// If cart exists, remove item from cart
	const id = params.id[0].toString()

	await cartModel.updateOne({ _id: cart._id }, { $pull: { contents: id } })

	return Response.json(
		{ success: true, message: 'Item removed from cart' },
		{ status: 200 },
	)
}

// Get cart of a user
export const GET = async (
	req: Request,
	{ params }: { params: { id: string } },
) => {
	const user = params.id

	await connectDB()

	const cart = await cartModel.findOne({ user }).populate('contents')
	if (!cart) {
		return Response.json(
			{ success: false, message: 'Cart not found' },
			{ status: 404 },
		)
	}

	return Response.json(
		{ success: true, message: 'Cart found', cart },
		{ status: 200 },
	)
}
