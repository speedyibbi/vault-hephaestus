import { motion } from 'framer-motion';

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
			className=''
		></motion.form>
	);
}
