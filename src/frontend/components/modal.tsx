import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Props {
	text?: string;
	buttonOneText?: string;
	buttonTwoText?: string;
	onButtonOneClick?: () => void;
	onButtonTwoClick?: () => void;
}

export default function Modal({
	text = 'Are you sure?',
	buttonOneText = 'No',
	buttonTwoText = 'Yes',
	onButtonOneClick = () => {},
	onButtonTwoClick = () => {},
}: Props) {
	const modalRef = useRef<IDialog | null>(null);

	const closeModal = () => {
		if (!modalRef.current) return;

		modalRef.current.close();
	};

	const buttonClick = (fn: () => void) => {
		fn();
		closeModal();
	};

	useEffect(() => {
		if (!modalRef.current) return;

		modalRef.current.showModal();
	}, []);

	return (
		<motion.dialog
			ref={modalRef}
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			transition={{ duration: 0.15 }}
			className='px-20 py-10 justify-self-center top-1/3 rounded-2xl bg-white drop-shadow-2xl'
		>
			<p className='mb-12 font-medium text-base text-center leading-none tracking-tighter'>
				{text}
			</p>
			<span className='flex place-content-center place-items-center gap-3'>
				<button
					onClick={() => buttonClick(onButtonOneClick)}
					className='w-24 py-3 font-medium text-base leading-none tracking-tighter border-2 border-black rounded-md hover:text-white hover:bg-black transition-colors duration-150'
				>
					{buttonOneText}
				</button>
				<button
					onClick={() => buttonClick(onButtonTwoClick)}
					className='w-24 py-3 font-medium text-base leading-none tracking-tighter border-2 border-black rounded-md hover:text-white hover:bg-black transition-colors duration-150'
				>
					{buttonTwoText}
				</button>
			</span>
		</motion.dialog>
	);
}
