import NextAuth from 'next-auth/next'
import GitHubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import connectDB from '@/lib/db'
import { compareSync } from 'bcryptjs'
import { z } from 'zod'
import { NextAuthOptions } from 'next-auth'
import { userModel } from '@/models/user.model'

const authOptions: NextAuthOptions = {
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
				const userFromDB = await userModel.findOne({
					email: credentials?.email,
					provider: 'credentials',
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
	callbacks: {
		async signIn({ user, account, profile }) {
			await connectDB()

			// Check if user exists in DB
			let existingUser = await userModel.findOne({
				email: user.email,
				provider: account?.provider,
			})

			if (!existingUser) {
				// Create a new user if it doesn't exist
				existingUser = await userModel.create({
					name: user.name || profile?.name,
					email: user.email,
					provider: account?.provider,
					providerId: profile?.sub,
					password: null,
				})
			}

			return true
		},
		async session({ session, token }) {
			// @ts-ignore
			session.user.id = token.id
			return session
		},
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
	},
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
