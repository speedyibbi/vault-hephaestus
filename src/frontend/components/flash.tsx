import { useEffect, useRef } from 'react';
import { animate } from 'framer-motion';

import { PlusCross } from './icons';

import { useFlashStore } from '../utils/stores/flash-store';

export default function Flash() {
	const error = useFlashStore((state) => state.error);
	const text = useFlashStore((state) => state.text);
	const setFlash = useFlashStore((state) => state.setFlash);

	const flashRef = useRef<HTMLDialogElement | null>(null);

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
		if (!flashRef.current) return;

		if (text.length > 0) {
			flashRef.current.show();

			animate(
				flashRef.current,
				{ opacity: 1 },
				{
					duration: 0.15,
				}
			);
		}
	}, [error, text]);

	return (
		<dialog
			ref={flashRef}
			className='min-w-fit w-128 px-4 py-2 justify-self-center bottom-6 rounded-full bg-white drop-shadow-2xl opacity-0'
			style={{ backgroundColor: error ? 'var(--danger)' : 'white' }}
		>
			<span
				className='flex place-content-between place-items-center gap-4'
				style={{ color: error ? 'white' : 'black' }}
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
