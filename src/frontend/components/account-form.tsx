import { motion } from 'framer-motion';

import TextInput from './text-input';
import FileImagePreviewInput from './file-image-preview-input';
import AccountFormAdditionalField from './account-form-additional-field';
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
					<TextInput id='title' name='title' placeholderText='Title' />
					<FileImagePreviewInput id='image' name='image' />
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
					<AccountFormAdditionalField id='field-1' name='field-1' />
					<AccountFormAdditionalField
						id='field-2'
						name='field-2'
						defaultChecked
					/>
				</aside>
			</div>
		</motion.form>
	);
}
