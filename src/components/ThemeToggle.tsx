'use client'

import { useEffect, useState } from 'react'
import { LuSun, LuMoon } from 'react-icons/lu'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

const ThemeToggle = () => {
	const { theme, resolvedTheme, setTheme } = useTheme()
	const [mounted, setMounted] = useState<boolean>(false)

	const toggleTheme = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	useEffect(() => {
		if (resolvedTheme === 'dark') {
			setTheme('dark')
		} else {
			setTheme('light')
		}
		setMounted(true)
	}, [setTheme, resolvedTheme])

	return (
		<>
			{mounted && (
				<div
					onClick={toggleTheme}
					className='relative flex cursor-pointer items-center'
				>
					<LuSun
						className={cn(
							'h-6 w-6 text-yellow-400 transition-transform',
							theme === 'light'
								? 'rotate-90 scale-0 transform'
								: 'rotate-0 scale-100 transform',
						)}
					/>
					<LuMoon
						className={cn(
							'absolute h-6 w-6 fill-black transition-transform',
							theme === 'light'
								? 'rotate-0 scale-100 transform'
								: '-rotate-90 scale-0 transform',
						)}
					/>
					<span className='sr-only'>Toggle theme</span>
				</div>
			)}
		</>
	)
}

export default ThemeToggle
