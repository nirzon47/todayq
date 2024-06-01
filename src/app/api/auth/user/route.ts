import connectDB from '@/lib/db'
import { userModel } from '@/models/user.model'
import { hashSync } from 'bcryptjs'

// Sign up user using credentials
export const POST = async (req: Request) => {
	const { email, name, password } = await req.json()

	await connectDB()

	// If user already exists, return error
	const user = await userModel.findOne({ email })
	if (user) {
		return Response.json(
			{ success: false, message: 'User already exists' },
			{ status: 409 },
		)
	}

	// Hash password
	const hash = hashSync(password, 10)

	// Create user
	const userCreated = await userModel.create({ email, name, password: hash })

	return Response.json(
		{
			success: true,
			message: 'User created successfully',
			user: { id: userCreated._id, email, name },
		},
		{ status: 201 },
	)
}
