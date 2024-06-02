import Image from 'next/image'

const Loading = () => {
	return (
		<div className='flex h-[calc(100vh-64px)] w-screen items-center justify-center'>
			<Image src={'/loader.svg'} alt='loading' width={256} height={256} />
		</div>
	)
}

export default Loading
