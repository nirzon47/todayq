import connectDB from '@/lib/db'
import { cartModel } from '@/models/cart.model'
import { orderModel } from '@/models/orderHistory.model'
import Razorpay from 'razorpay'

interface razorpayOrderType {
	id: string
}

const rpInstance = new Razorpay({
	key_id: process.env.RAZORPAY_KEY_ID!,
	key_secret: process.env.RAZORPAY_SECRET!,
})

const razorpayPayment = async (total: number) => {
	const razorPayOptions = {
		amount: total! * 100,
		currency: 'INR',
		payment_capture: 1,
	}

	try {
		return await rpInstance.orders.create(razorPayOptions)
	} catch (error) {
		return error
	}
}

export const POST = async (req: Request) => {
	const { user } = await req.json()

	await connectDB()

	const cart = await cartModel.findOne({ user }).populate('contents')

	if (!cart || cart?.contents.length === 0) {
		return Response.json(
			{ success: false, message: 'Cart is empty' },
			{ status: 404 },
		)
	}

	const total = cart.contents.reduce(
		(acc: number, content: any) =>
			content.contentOffering[0].discountedPrice + acc,
		0,
	)

	// Razorpay
	const razorpayOrder: razorpayOrderType | any = await razorpayPayment(
		total as number,
	)

	const orderObject = {
		user,
		contents: cart?.contents,
		total,
		paymentId: razorpayOrder.id,
		status: 'pending',
	}

	// Create order
	const order = await orderModel.create(orderObject)

	// Delete cart
	await cartModel.deleteMany({ user })

	return Response.json(
		{ success: true, message: 'Order created successfully', order },
		{ status: 201 },
	)
}
