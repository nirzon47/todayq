import { Schema, model, models } from 'mongoose'

const cartSchema = new Schema({
	user: {
		type: String,
		required: true,
	},
	contents: {
		type: [Schema.Types.ObjectId],
		ref: 'content',
	},
})

export const cartModel = models.cart || model('cart', cartSchema)
