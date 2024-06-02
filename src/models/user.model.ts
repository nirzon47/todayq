import { Schema, model, models } from 'mongoose'

const userSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
		},
		provider: {
			type: String,
			enum: ['credentials', 'google', 'github'],
			default: 'credentials',
		},
		providerId: {
			type: String,
		},
	},
	{ timestamps: true },
)

export const userModel = models.user || model('user', userSchema)
