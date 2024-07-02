import { motion } from 'framer-motion';

import TextInput from './text-input';
import FileImagePreviewInput from './file-image-preview-input';
import CheckboxInput from './checkbox-input';
import { PlusCross } from './icons';

export default function AccountForm() {
	const addField = () => {};

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
						<TextInput id='title' name='title' placeholderText='Title' />
					</div>
					<div className='w-full'>
						<FileImagePreviewInput id='image' name='image' />
					</div>
				</aside>
				<aside className='w-full flex flex-col place-content-start place-items-start gap-12'>
					<button
						type='button'
						onClick={addField}
						className='mt-2 px-5 py-2 flex place-content-start place-items-center gap-3 font-medium text-base leading-none tracking-tighter border-2 border-white rounded-md'
					>
						Add field
						<PlusCross className='w-5 stroke-current' />
					</button>
					<div className='w-full flex flex-col place-content-start place-items-start gap-3'>
						<div className='w-full h-12 px-6 relative flex place-content-start place-items-center rounded-2xl bg-accent'>
							<TextInput
								id='field-1-name'
								name='field-1-name'
								placeholderText='Name'
							/>
						</div>
						<div className='w-full h-12 px-6 relative flex place-content-start place-items-center rounded-2xl bg-accent'>
							<TextInput
								id='field-1-value'
								name='field-1-value'
								placeholderText='Value'
							/>
						</div>
						<span className='w-full px-4 flex place-content-start place-items-center gap-3'>
							<CheckboxInput />
							<p className='font-medium text-xl leading-none tracking-tighter'>
								Sensitive
							</p>
							<button
								type='button'
								className='ml-auto p-4 hover:bg-accent rounded-2xl transition-colors duration-150'
							>
								<PlusCross className='w-5 stroke-current transform rotate-45' />
							</button>
						</span>
					</div>
				</aside>
			</div>
		</motion.form>
	);
}
