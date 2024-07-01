import { motion } from 'framer-motion';

import TextInput from './text-input';
import FileImagePreviewInput from './file-image-preview-input';

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
						<TextInput id='title' name='title' placeholderText='Title' />
					</div>
					<div className='w-full'>
						<FileImagePreviewInput />
					</div>
				</aside>
				<aside className='w-full flex flex-col place-content-start place-items-start gap-12'></aside>
			</div>
		</motion.form>
	);
}
