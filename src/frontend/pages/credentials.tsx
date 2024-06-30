import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Searchbar from '../components/searchbar';
import AccountForm from '../components/account-form';
import { PlusCross } from '../components/icons';

export default function Credentials() {
	const [showForm, setShowForm] = useState(false);

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
					onClick={() => {
						setShowForm((formState) => !formState);
					}}
					className='p-4 hover:bg-accent rounded-2xl transition-colors duration-150'
				>
					<motion.span
						initial={{ rotateZ: '0deg' }}
						animate={{ rotateZ: showForm ? '45deg' : '0deg' }}
						exit={{ rotateZ: '0deg' }}
						className='block'
					>
						<PlusCross className='w-5 stroke-current' />
					</motion.span>
				</button>
			</span>
			<AnimatePresence mode='wait'>
				{showForm ? (
					<motion.span
						key='no-items'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						className='w-full h-full flex place-content-center place-items-center font-medium text-xl leading-none tracking-tighter'
					>
						No items
					</motion.span>
				) : (
					<AccountForm />
				)}
			</AnimatePresence>
		</motion.section>
	);
}

// todo: switch form and 'no items' places
