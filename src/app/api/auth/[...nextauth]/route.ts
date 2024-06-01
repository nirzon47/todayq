import NextAuth from 'next-auth/next'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from '@/lib/db'
import { model } from 'mongoose'
import { compareSync } from 'bcryptjs'
import { z } from 'zod'

export const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
		}),
		CredentialsProvider({
			name: 'Email and Password',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'john@doe.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, _) {
				// Validate inputs
				if (
					!credentials?.email ||
					!credentials?.password ||
					!z.string().email().safeParse(credentials?.email).success
				) {
					return null
				}

				// Database connection
				await connectDB()

				// Check if user exists in DB
				const userFromDB = await model('user').findOne({
					email: credentials?.email,
				})

				// If user doesn't exist return null
				if (!userFromDB) {
					return null
				}

				// Check if password is correct
				const isValidPassword = compareSync(
					credentials?.password,
					userFromDB.password,
				)

				// If password is incorrect return null
				if (!isValidPassword) {
					return null
				}

				// Return user
				return {
					id: userFromDB._id,
					email: userFromDB.email,
					name: userFromDB.name,
				}
			},
		}),
	],
	pages: {
		signIn: '/auth/signin',
	},
}

export const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
