import { motion } from 'framer-motion';

import Searchbar from '../components/searchbar';
import { PlusCross } from '../components/icons';

export default function Credentials() {
	return (
		<motion.section
			key='credentials'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.15, ease: 'easeOut' }}
			className='h-full relative flex flex-col place-content-start place-items-start gap-24'
		>
			<span className='w-full flex place-content-between place-items-center gap-12'>
				<Searchbar />
				<button
					onClick={() => {}}
					className='p-4 hover:bg-accent rounded-2xl transition-colors duration-150'
				>
					<PlusCross className='w-5 stroke-current' />
				</button>
			</span>
			<span className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-medium text-xl leading-none tracking-tighter'>
				No items
			</span>
		</motion.section>
	);
}
