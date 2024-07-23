import { motion } from 'framer-motion';

import Logo from '../components/logo';
import TextInput from '../components/text-input';

interface Props {
	onAccessGranted?: () => void;
}

export default function AccessPanel({ onAccessGranted = () => {} }: Props) {
	const formSubmissionHandler = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onAccessGranted();
	};

	return (
		<motion.form
			key='access-panel'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			onSubmit={formSubmissionHandler}
			className='w-full h-full flex flex-col place-content-center place-items-center'
		>
			<Logo className='w-96 transform -translate-y-24' />
			<TextInput
				id='passcode'
				name='passcode'
				placeholderText='Enter Passcode'
				textAlign='center'
				style={{ width: '500px', transform: 'translateY(-96px)' }}
			/>
		</motion.form>
	);
}
