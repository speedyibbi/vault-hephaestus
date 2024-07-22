import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import CheckboxInput from '../components/checkbox-input';
import { Copy, RoundAboutArrows } from '../components/icons';

import { generatePassword } from '../utils/helpers';
import { useFlashStore } from '../utils/stores/flash-store';

export default function PasswordGenerator() {
	const setFlash = useFlashStore((state) => state.setFlash);

	const [passwordValue, setPasswordValue] = useState('');
	const [charactersValue, setCharactersValue] = useState(16);

	const copyHandler = () => {
		try {
			navigator.clipboard
				.writeText(passwordValue)
				.then(() => {
					setFlash({ error: false, text: `Generated password copied` });
				})
				.catch(() => {
					setFlash({ error: true, text: 'Failed to copy generated password' });
				});
		} catch (error) {
			setFlash({ error: true, text: error.message });
		}
	};

	const formHandler = (event: React.FormEvent<HTMLFormElement>) => {
		try {
			const formData = new FormData(event.currentTarget);
			const data = Object.fromEntries(formData.entries());

			const password = generatePassword({
				length: Number(data.characters),
				uppercase: Boolean(data.uppercase),
				lowercase: Boolean(data.lowercase),
				digits: Boolean(data.digits),
				specialChars: Boolean(data.specialChars),
			});

			setPasswordValue(password);
		} catch (error) {
			setFlash({ error: true, text: error.message });
		}
	};

	useEffect(() => {
		try {
			setPasswordValue(
				generatePassword({
					length: charactersValue,
					uppercase: true,
					lowercase: true,
				})
			);
		} catch (error) {
			setFlash({ error: true, text: error.message });
			setPasswordValue('');
		}
	}, []);

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
					formHandler(event);
				}}
				onChange={formHandler}
				className='w-full flex flex-col place-content-center place-items-center gap-10'
			>
				<div className='min-w-96 max-w-xl w-full h-12 px-6 relative flex place-content-center place-items-center gap-3 text-muted rounded-2xl bg-accent select-all'>
					<p className='flex-grow font-medium text-xl text-center leading-none tracking-tighter overflow-x-scroll appearance-none'>
						{passwordValue}
					</p>
					<button
						type='button'
						onClick={copyHandler}
						className='hover:text-foreground transition-colors duration-150'
					>
						<Copy className='w-5 stroke-current' />
					</button>
					<span className='absolute top-0 right-0 transform translate-x-full'>
						<button
							type='submit'
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
						<CheckboxInput
							id='specialChars'
							name='specialChars'
							defaultChecked={false}
						/>
						<p className='font-medium text-xl leading-none tracking-tighter'>
							Special
						</p>
					</span>
				</div>
				<div className='flex place-content-center place-items-center gap-12'>
					<input
						id='characters'
						name='characters'
						type='range'
						min={1}
						max={50}
						value={charactersValue}
						onChange={(event) =>
							setCharactersValue(parseInt(event.target.value))
						}
						className='w-64'
					/>
					<p className='font-medium text-xl text-muted leading-none tracking-tighter'>
						Characters: {charactersValue.toString().padStart(2, '0')}
					</p>
				</div>
			</form>
		</motion.section>
	);
}
