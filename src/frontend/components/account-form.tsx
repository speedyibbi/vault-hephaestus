import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import TextInput from './text-input';
import FileImagePreviewInput from './file-image-preview-input';
import AccountFormAdditionalField from './account-form-additional-field';
import { PlusCross } from './icons';

export default function AccountForm() {
	const [additionalFields, setAdditionalFields] = useState([0, 1]);

	const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const data = Object.fromEntries(formData.entries());

		console.log(data);
	};

	const addField = () => {
		setAdditionalFields((prevState) => [
			...prevState,
			prevState.at(-1) !== undefined ? prevState.at(-1) + 1 : 0,
		]);
	};

	return (
		<motion.form
			key='account-form'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			onSubmit={formSubmissionHandler}
			className='w-full h-full pr-24'
		>
			<div className='w-full h-full grid grid-rows-1 grid-cols-2 gap-24'>
				<aside className='w-full flex flex-col place-content-start place-items-start gap-12'>
					<TextInput id='title' name='title' placeholderText='Title' />
					<FileImagePreviewInput id='image' name='image' />
					<button
						type='submit'
						className='w-24 py-3 font-medium text-base text-white leading-none tracking-tighter border-2 border-white rounded-md hover:text-black hover:bg-white transition-colors duration-150'
					>
						Save
					</button>
				</aside>
				<aside className='w-full max-h-full pr-1 pb-24 flex flex-col place-content-start place-items-start gap-12 overflow-y-scroll'>
					<button
						type='button'
						onClick={addField}
						className='mt-2 px-5 py-2 flex place-content-start place-items-center gap-3 font-medium text-base leading-none tracking-tighter border-2 border-white rounded-md'
					>
						Add field
						<PlusCross className='w-5 stroke-current' />
					</button>
					<AnimatePresence>
						{additionalFields.map((key, idx) => (
							<AccountFormAdditionalField
								key={key}
								id={`field-${idx + 1}`}
								name={`field-${idx + 1}`}
								defaultChecked={false}
								onCross={() =>
									setAdditionalFields((prevState) =>
										prevState.filter((k) => k !== key)
									)
								}
							/>
						))}
					</AnimatePresence>
				</aside>
			</div>
		</motion.form>
	);
}
