import { motion } from 'framer-motion';

export default function Credentials() {
	return (
		<motion.section
			key='credentials'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
		>
			<p>credentials</p>
		</motion.section>
	);
}
