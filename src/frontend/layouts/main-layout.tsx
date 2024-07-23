import { motion } from 'framer-motion';

import Sidebar from '../components/sidebar';

interface Props {
	children?: React.ReactNode;
}

export default function MainLayout({ children }: Props) {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='w-full h-full p-12 flex'
		>
			<Sidebar />
			<main className='h-full px-12 py-6 flex-grow'>{children}</main>
		</motion.div>
	);
}
