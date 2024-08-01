import { motion } from 'framer-motion';

import Logo from '../components/logo';
import TextInput from '../components/text-input';

import { accessApplication } from '../utils/helpers';
import { useFlashStore } from '../utils/stores/flash-store';
import { useRef } from 'react';

interface Props {
	onAccessGranted?: () => void;
}

export default function AccessPanel({ onAccessGranted = () => {} }: Props) {
	const setFlash = useFlashStore((state) => state.setFlash);

	const formRef = useRef<HTMLFormElement>(null);

	const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
		try {
			event.preventDefault();

			const formData = new FormData(event.currentTarget);
			const data = Object.fromEntries(formData.entries());

			accessApplication(data.passcode as string)
				.then(({ accessGranted }) => {
					if (accessGranted) {
						onAccessGranted();
					} else {
						setFlash({ error: true, text: 'Invalid passcode' });

						if (formRef.current) formRef.current.reset();
					}
				})
				.catch(() => {
					setFlash({ error: true, text: 'Could not grant access' });
				});
		} catch (error) {
			setFlash({ error: true, text: error.message });
		}
	};

	return (
		<motion.form
			key='access-panel'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			ref={formRef}
			onSubmit={formSubmissionHandler}
			className='w-full h-full flex flex-col place-content-center place-items-center'
		>
			<Logo className='w-96 transform -translate-y-24' />
			<TextInput
				id='passcode'
				name='passcode'
				type='password'
				placeholderText='Enter Passcode'
				textAlign='center'
				style={{
					width: '500px',
					minHeight: '48px',
					transform: 'translateY(-81px)',
				}}
			/>
		</motion.form>
	);
}
