import { orderModel } from '@/models/orderHistory.model'

export const GET = async (
	req: Request,
	{ params }: { params: { id: string } },
) => {
	const { id } = params

	const orders = await orderModel.find({ user: id }).populate('contents')

	if (orders.length === 0) {
		return Response.json(
			{ success: false, message: 'No orders found' },
			{ status: 404 },
		)
	}

	return Response.json({ success: true, orders })
}
