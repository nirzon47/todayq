import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Content Offerings',
	description: 'Buy content for your business',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<body className={`${inter.className}`}>
				<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
					{children}
				</ThemeProvider>
				<Toaster />
			</body>
		</html>
	)
}
