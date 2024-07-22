import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import TextInput from './text-input';
import FileImagePreviewInput from './file-image-preview-input';
import AccountFormAdditionalField from './account-form-additional-field';
import Button from './button';
import { PlusCross } from './icons';

import { saveAccount } from '../utils/helpers';
import { useFlashStore } from '../utils/stores/flash-store';

interface Props {
	account?: IAccount;
	onAccountSaved?: () => void;
}

export default function AccountForm({
	account,
	onAccountSaved = () => {},
}: Props) {
	const setFlash = useFlashStore((state) => state.setFlash);

	const formRef = useRef<HTMLFormElement>(null);
	const [formResetCount, setFormResetCount] = useState(0);
	const [imageData, setImageData] = useState<string | null>(null);
	const [defaultKeys, setDefaultKeys] = useState(
		Object.keys(account?.details || {})
	);
	const [defaultValues, setDefaultValues] = useState(
		Object.values(account?.details || {})
	);
	const [additionalFields, setAdditionalFields] = useState(
		defaultValues.length > 0 ? defaultValues.map((_value, idx) => idx) : [0, 1]
	);

	const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const formData = new FormData(event.currentTarget);
			const data = Object.fromEntries(formData.entries());

			const accountData = {
				...data,
				image: imageData,
				account_id: account?.account_id || '-1',
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
			className='w-full pr-24 relative overflow-hidden'
		>
			<div className='w-full h-full grid grid-rows-1 grid-cols-2 place-content-start place-items-stretch gap-24'>
				<aside className='w-full pb-12 flex flex-col place-content-start place-items-start gap-12 overflow-x-hidden overflow-y-scroll'>
					<TextInput
						id='title'
						name='title'
						placeholderText='Title'
						defaultValue={account?.title}
					/>
					<FileImagePreviewInput
						key={formResetCount}
						id='image'
						name='image'
						onImageUpdate={(imageData) => setImageData(imageData)}
						defaultImage={account?.image}
					/>
					<button
						type='submit'
						className='w-24 py-3 font-medium text-base text-foreground leading-none tracking-tighter border-2 border-foreground rounded-md hover:text-background hover:bg-foreground transition-colors duration-150'
					>
						Save
					</button>
				</aside>
				<aside className='w-full pr-1 pb-12 flex flex-col place-content-start place-items-start gap-12 overflow-x-hidden overflow-y-scroll'>
					<Button
						text='Add field'
						icon={PlusCross}
						onClick={addField}
						style={{ marginTop: '0.5rem' }}
					/>
					<AnimatePresence>
						{additionalFields.map((key, idx) => (
							<AccountFormAdditionalField
								key={key}
								id={`field-${idx + 1}`}
								name={`field-${idx + 1}`}
								defaultName={defaultKeys[idx]}
								defaultValue={defaultValues[idx]?.value || ''}
								defaultChecked={
									parseInt(defaultValues[idx]?.sensitive) === 1 || false
								}
								onCross={() => {
									setAdditionalFields((prevState) =>
										prevState.filter((k) => k !== key)
									);
									setDefaultKeys((prevState) => {
										prevState.splice(idx, 1);
										return prevState;
									});
									setDefaultValues((prevState) => {
										prevState.splice(idx, 1);
										return prevState;
									});
								}}
							/>
						))}
					</AnimatePresence>
				</aside>
			</div>
		</motion.form>
	);
}
