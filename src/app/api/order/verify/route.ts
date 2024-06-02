import { orderModel } from '@/models/orderHistory.model'

export const POST = async (req: Request) => {
	const { _id, razorpay_payment_id: paymentId } = await req.json()

	await orderModel.findOneAndUpdate(
		{ _id },
		{
			$set: {
				paymentId,
				status: 'completed',
			},
		},
		{ new: true },
	)

	return Response.json({
		success: true,
		message: 'Payment verified successfully',
	})
}
