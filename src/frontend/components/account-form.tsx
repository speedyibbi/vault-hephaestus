import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import TextInput from './text-input';
import FileImagePreviewInput from './file-image-preview-input';
import AccountFormAdditionalField from './account-form-additional-field';
import { PlusCross } from './icons';

import { saveAccount } from '../utils/helpers';
import { useFlashStore } from '../utils/stores/flash-store';

interface Props {
	onAccountSaved?: () => void;
}

export default function AccountForm({ onAccountSaved = () => {} }: Props) {
	const setFlash = useFlashStore((state) => state.setFlash);

	const formRef = useRef<HTMLFormElement>(null);
	const [formResetCount, setFormResetCount] = useState(0);
	const [additionalFields, setAdditionalFields] = useState([0, 1]);
	const [imageData, setImageData] = useState<string | null>(null);

	const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const formData = new FormData(event.currentTarget);
			const data = Object.fromEntries(formData.entries());

			const accountData = {
				...data,
				image: imageData,
			};

			saveAccount(accountData)
				.then(({ valid, error }) => {
					if (!valid) {
						setFlash({ error: true, text: error });
					} else {
						onAccountSaved();

						setFlash({ error: false, text: 'Account saved successfully' });

						if (formRef.current) {
							formRef.current.reset();
							setFormResetCount((prevState) => prevState + 1);
						}
					}
				})
				.catch(() => {
					setFlash({ error: true, text: 'Trouble saving account' });
				});
		} catch (error) {
			setFlash({ error: true, text: error.message });
		}
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
			ref={formRef}
			onSubmit={formSubmissionHandler}
			className='w-full h-full pr-24'
		>
			<div className='w-full h-full grid grid-rows-1 grid-cols-2 gap-24'>
				<aside className='w-full pb-24 flex flex-col place-content-start place-items-start gap-12 overflow-y-scroll'>
					<TextInput id='title' name='title' placeholderText='Title' />
					<FileImagePreviewInput
						key={formResetCount}
						id='image'
						name='image'
						onImageUpdate={(imageData) => setImageData(imageData)}
					/>
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
