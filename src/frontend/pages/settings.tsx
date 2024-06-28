import { motion } from 'framer-motion';

export default function Settings() {
	return (
		<motion.section
			key='settings'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
		>
			<p>settings</p>
		</motion.section>
	);
}
