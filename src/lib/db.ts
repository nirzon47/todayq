import mongoose from 'mongoose'

declare global {
	var mongoose: any // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
	throw new Error(
		'Please define the MONGODB_URI environment variable inside .env',
	)
}

let cached = global.mongoose

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null }
}

const connectDB = async () => {
	if (cached.connection) {
		return cached.connection
	}
	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		}
		cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
			return mongoose
		})
	}
	try {
		cached.connection = await cached.promise
	} catch (error) {
		cached.promise = null
		throw error
	}

	return cached.connection
}

export default connectDB
