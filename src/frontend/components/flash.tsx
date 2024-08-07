import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

import { PlusCross } from './icons';

import { useFlashStore } from '../utils/stores/flash-store';

const TIMEOUT = 3000;

export default function Flash() {
	const error = useFlashStore((state) => state.error);
	const text = useFlashStore((state) => state.text);
	const setFlash = useFlashStore((state) => state.setFlash);

	const flashRef = useRef<IDialog | null>(null);

	const closeFlash = () => {
		if (!flashRef.current) return;

		animate(
			flashRef.current,
			{ opacity: 0 },
			{
				duration: 0.15,
				onComplete: () => {
					flashRef.current.close();
					setFlash({ error: false, text: '' });
				},
			}
		);
	};

	useEffect(() => {
		if (!flashRef.current || text.length === 0) return;

		flashRef.current.show();

		animate(
			flashRef.current,
			{ opacity: 1 },
			{
				duration: 0.15,
			}
		);

		const timeout = setTimeout(() => {
			closeFlash();
		}, TIMEOUT);

		return () => {
			clearTimeout(timeout);
		};
	}, [error, text]);

	return (
		<dialog
			ref={flashRef}
			className='min-w-fit w-128 px-4 py-2 justify-self-center bottom-6 rounded-full drop-shadow-2xl opacity-0'
			style={{ backgroundColor: error ? 'var(--danger)' : 'var(--foreground)' }}
		>
			<span
				className='flex place-content-between place-items-center gap-4'
				style={{ color: error ? 'var(--foreground)' : 'var(--background)' }}
			>
				<p className='font-medium text-base leading-none tracking-tighter'>
					{text}
				</p>
				<button onClick={closeFlash} className='focus:outline-none'>
					<PlusCross className='w-4 stroke-current transform rotate-45' />
				</button>
			</span>
		</dialog>
	);
}
