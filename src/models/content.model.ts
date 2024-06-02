import { Schema, model, models } from 'mongoose'

const contentSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			enum: ['content-distribution', 'advertisement'],
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		telegram: {
			type: String,
			required: true,
		},
		gambling: {
			type: Boolean,
			required: true,
		},
		adult: {
			type: Boolean,
			required: true,
		},
		web3: {
			type: Boolean,
			required: true,
		},
		contentOffering: [
			{
				category: {
					type: String,
					enum: [
						'press-release',
						'sponsored',
						'sponsored-with-aggregators',
						'newsletter',
						'social-media',
						'review-article',
						'',
					],
					required: true,
				},
				price: {
					type: Number,
					required: true,
				},
				discountedPrice: {
					type: Number,
					required: true,
				},
				features: {
					type: [String],
					required: true,
				},
			},
		],
	},
	{ timestamps: true },
)

export const contentModel = models.content || model('content', contentSchema)
