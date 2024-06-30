import { motion } from 'framer-motion';

export default function AccountForm() {
	return (
		<motion.form
			key='account-form'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			onSubmit={(event) => {
				event.preventDefault();
			}}
			className='w-full h-full pr-24'
		>
			<div className='w-full pr-1 grid grid-rows-1 grid-cols-2 gap-24'>
				<aside className='w-full flex flex-col place-content-start place-items-start gap-12'>
					<div className='w-full h-12 px-6 relative flex place-content-start place-items-center rounded-2xl bg-accent'>
						<input
							id='title'
							name='title'
							type='text'
							placeholder='Title'
							className='w-full font-medium text-xl text-foreground leading-none tracking-tighter bg-transparent focus:outline-none'
						/>
					</div>
					<div className='w-full'>
						<div className='w-full h-12 px-6 relative flex place-content-start place-items-center rounded-2xl bg-accent'>
							<input
								id='image'
								name='image'
								type='file'
								placeholder='Chose image'
								className='w-full font-medium text-xl text-transparent leading-none tracking-tighter cursor-pointer'
							/>
						</div>
						<span className='mt-3 px-4 py-2 inline-block border-2 border-accent rounded-xl font-medium text-sm text-muted leading-none tracking-tighter'>
							No image selected
						</span>
					</div>
				</aside>
				<aside className='w-full flex flex-col place-content-start place-items-start gap-12'></aside>
			</div>
		</motion.form>
	);
}
