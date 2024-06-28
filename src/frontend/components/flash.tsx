import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import { PlusCross } from './icons';

interface Props {
	children?: string;
}

export default function Flash({ children }: Props) {
	const flashRef = useRef<HTMLDialogElement | null>(null);

	const closeFlash = () => {
		if (!flashRef.current) return;

		flashRef.current.close();
	};

	useEffect(() => {
		if (!flashRef.current) return;

		flashRef.current.show();
	}, []);

	return (
		<motion.dialog
			ref={flashRef}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.15 }}
			className='min-w-fit w-128 px-4 py-1 justify-self-center bottom-6 rounded-full bg-white drop-shadow-2xl'
		>
			<span className='flex place-content-between place-items-center gap-4 text-black'>
				<p className='font-medium text-xl leading-none tracking-tighter'>
					{children}
				</p>
				<button onClick={closeFlash} className='focus:outline-none'>
					<PlusCross className='w-5 stroke-current transform rotate-45' />
				</button>
			</span>
		</motion.dialog>
	);
}
