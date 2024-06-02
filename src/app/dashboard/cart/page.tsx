import CartContent from '@/components/cart/CartContent'
import { CardTitle, CardHeader, Card } from '@/components/ui/card'

const Cart = () => {
	return (
		<div className='min-h-[calc(100vh-4rem)] overflow-x-hidden px-4 py-12'>
			<h1 className='mx-auto mb-8 max-w-3xl text-3xl font-bold'>Your Cart</h1>
			<Card className='mx-auto w-full max-w-3xl'>
				<CardHeader>
					<CardTitle>Contents</CardTitle>
				</CardHeader>
				<CartContent />
			</Card>
		</div>
	)
}

export default Cart
