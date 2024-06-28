import { motion } from 'framer-motion';

export default function PasswordGenerator() {
	return (
		<motion.section
			key='password-generator'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
		>
			<p>password generator</p>
		</motion.section>
	);
}
