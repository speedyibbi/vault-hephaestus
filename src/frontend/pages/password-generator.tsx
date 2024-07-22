import { motion } from 'framer-motion';

import CheckboxInput from '../components/checkbox-input';
import { RoundAboutArrows } from '../components/icons';

export default function PasswordGenerator() {
	return (
		<motion.section
			key='password-generator'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='h-full flex place-content-center place-items-center'
		>
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
				className='w-full flex flex-col place-content-center place-items-center gap-10'
			>
				<div className='min-w-96 max-w-xl w-full h-12 px-6 relative flex place-content-center place-items-center font-medium text-xl text-muted text-center leading-none tracking-tighter rounded-2xl bg-accent select-all'>
					SLiRQndrYGnHnkYN
					<span className='absolute top-0 right-0 transform translate-x-full'>
						<button
							type='button'
							onClick={() => {}}
							className='ml-6 p-4 hover:bg-accent rounded-2xl transition-colors duration-150'
						>
							<RoundAboutArrows className='w-5 stroke-current' />
						</button>
					</span>
				</div>
				<div className='w-full flex place-content-center place-items-center gap-12'>
					<span className='px-4 flex place-content-start place-items-center gap-3'>
						<CheckboxInput
							id='uppercase'
							name='uppercase'
							defaultChecked={true}
						/>
						<p className='font-medium text-xl leading-none tracking-tighter'>
							Uppercase
						</p>
					</span>
					<span className='px-4 flex place-content-start place-items-center gap-3'>
						<CheckboxInput
							id='lowercase'
							name='lowercase'
							defaultChecked={true}
						/>
						<p className='font-medium text-xl leading-none tracking-tighter'>
							Lowercase
						</p>
					</span>
					<span className='px-4 flex place-content-start place-items-center gap-3'>
						<CheckboxInput id='digits' name='digits' defaultChecked={false} />
						<p className='font-medium text-xl leading-none tracking-tighter'>
							Digits
						</p>
					</span>
					<span className='px-4 flex place-content-start place-items-center gap-3'>
						<CheckboxInput id='special' name='special' defaultChecked={false} />
						<p className='font-medium text-xl leading-none tracking-tighter'>
							Special
						</p>
					</span>
				</div>
				<div className='flex place-content-center place-items-center gap-12'>
					<input type='range' min={8} max={128} className='w-64' />
					<p className='font-medium text-xl text-muted leading-none tracking-tighter'>
						Characters: 16
					</p>
				</div>
			</form>
		</motion.section>
	);
}
