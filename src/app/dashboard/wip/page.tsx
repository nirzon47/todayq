import Image from 'next/image'

const InProgress = () => {
	return (
		<div className='grid h-[calc(100vh-3.5rem)] place-content-center'>
			<Image
				src={'/wip.svg'}
				alt='wip'
				width={256}
				height={256}
				quality={100}
				className='mx-auto mb-8'
			/>
			<h1 className='mb-4 text-center text-2xl font-bold'>
				The page is under construction ! !
			</h1>
			<p className='text-center text-sm font-light tracking-wider text-zinc-400'>
				We are working on it
			</p>
			<p className='text-center text-sm font-light tracking-wider text-zinc-400'>
				Apologize for the inconvenience
			</p>
		</div>
	)
}

export default InProgress
