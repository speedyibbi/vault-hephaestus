import { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { PlusCross } from './icons';

interface Props {
	error?: boolean;
	onClear?: () => void;
	children?: ReactNode;
}

export default function Flash({ error, onClear, children }: Props) {
	const flashRef = useRef<HTMLDialogElement | null>(null);

	const closeFlash = () => {
		if (!flashRef.current) return;

		onClear();
		flashRef.current.close();
	};

	useEffect(() => {
		if (!flashRef.current) return;

		flashRef.current.showModal();
	}, []);

	return (
		<motion.dialog
			ref={flashRef}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.15 }}
			className='flash min-w-fit w-128 px-4 py-2 justify-self-center top-full transform -translate-y-12 rounded-full bg-white drop-shadow-2xl'
			style={{ backgroundColor: error ? 'var(--danger)' : 'white' }}
		>
			<span
				className='flex place-content-between place-items-center gap-4'
				style={{ color: error ? 'white' : 'black' }}
			>
				<p className='font-medium text-base leading-none tracking-tighter'>
					{children}
				</p>
				<button onClick={closeFlash} className='focus:outline-none'>
					<PlusCross className='w-4 stroke-current transform rotate-45' />
				</button>
			</span>
		</motion.dialog>
	);
}
