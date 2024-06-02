interface ContentOffering {
	category: string
	price: number
	discountedPrice: number
	features: string[]
	_id: string
}

export interface ItemType {
	_id: string
	name: string
	url: string
	category: string
	desc: string
	email: string
	telegram: string
	gambling: boolean
	adult: boolean
	web3: boolean
	contentOffering: ContentOffering[]
	createdAt: string
	updatedAt: string
	__v: number
}
