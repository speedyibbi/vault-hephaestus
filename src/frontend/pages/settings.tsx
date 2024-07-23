import { useRef } from 'react';
import { motion } from 'framer-motion';

import TextInput from '../components/text-input';
import Button from '../components/button';
import { ArrowToDrive, FloppyDisk } from '../components/icons';

import { updatePasscode } from '../utils/helpers';
import { useFlashStore } from '../utils/stores/flash-store';

export default function Settings() {
	const setFlash = useFlashStore((state) => state.setFlash);

	const formRef = useRef<HTMLFormElement>(null);

	const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();

			const formData = new FormData(event.currentTarget);
			const data = Object.fromEntries(formData.entries());

			const passcode = data.passcode as string;
			const passcodeConfirmation = data['passcode-confirmation'] as string;

			if (passcode.length === 0) {
				setFlash({ error: true, text: 'Passcode cannot be empty' });
				return;
			}

			if (passcode !== passcodeConfirmation) {
				setFlash({ error: true, text: 'Passcodes do not match' });
				return;
			}

			updatePasscode(data.passcode as string)
				.then(({ updated }) => {
					if (updated) {
						setFlash({ error: false, text: 'Passcode updated successfully' });
					} else {
						setFlash({ error: true, text: 'Passcode could not be updated' });
					}

					if (formRef.current) formRef.current.reset();
				})
				.catch(() => {
					setFlash({ error: true, text: 'Trouble updating passcode' });
				});
		} catch (error) {
			setFlash({ error: true, text: error.message });
		}
	};

	return (
		<motion.section
			key='settings'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='w-full h-full'
		>
			<form
				onSubmit={formSubmissionHandler}
				className='w-128 h-full flex flex-col place-content-start place-items-start gap-10'
			>
				<TextInput
					id='passcode'
					name='passcode'
					placeholderText='Passcode'
					type='password'
				/>
				<TextInput
					id='passcode-confirmation'
					name='passcode-confirmation'
					placeholderText='Confirm Passcode'
					type='password'
				/>
				<span className='flex gap-6'>
					<Button
						type='submit'
						text='Save Passcode'
						icon={FloppyDisk}
						iconPosition='left'
						hover
						hoverTextColor='accent'
						hoverBgColor='foreground'
					/>
					<Button
						text='Export Data'
						icon={ArrowToDrive}
						iconPosition='left'
						onClick={() => {}}
						hover
						hoverTextColor='accent'
						hoverBgColor='foreground'
					/>
				</span>
				<div className='mt-auto font-black text-lg leading-normal tracking-tighter'>
					<span className='flex gap-2'>
						<span className='text-danger'>*</span>
						<p className='whitespace-normal break-words'>
							Be extremely careful when setting a passcode. Forgetting your
							security passcode will lock you out of the application, and
							therefore you will not be able to access any saved credentials.
						</p>
					</span>
					<span className='mt-3 flex gap-2'>
						<span className='text-danger'>*</span>
						<p className='whitespace-normal break-words'>
							The security passcode is included in the exported data.
						</p>
					</span>
				</div>
			</form>
		</motion.section>
	);
}
