import { Schema, model, models } from 'mongoose'

const orderSchema = new Schema({
	user: {
		type: String,
		required: true,
	},
	contents: {
		type: [Schema.Types.ObjectId],
		ref: 'content',
	},
	created: {
		type: Date,
		default: Date.now(),
	},
	status: {
		type: String,
		default: 'pending',
		enum: ['pending', 'completed'],
	},
	total: {
		type: Number,
		default: 0,
	},
	paymentId: String,
})

export const orderModel = models.order || model('order', orderSchema)
