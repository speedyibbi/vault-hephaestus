import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import FileInput from './file-input';

interface Props {
	id?: string;
	name?: string;
}

export default function FileImagePreviewInput({
	id = 'image',
	name = 'image',
}: Props) {
	const [imagePreview, setImagePreview] = useState('');

	const imageSelectionHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			const image = reader.result?.toString();
			setImagePreview(image);
		};
		reader.readAsDataURL(file);
	};

	return (
		<>
			<FileInput
				id={id}
				name={name}
				accept='image/*'
				onChange={imageSelectionHandler}
			/>
			<AnimatePresence>
				{imagePreview.length > 0 ? (
					<motion.img
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						src={imagePreview}
						alt='image'
						className='w-96 mt-3 inline-block border-2 border-accent rounded-full'
					/>
				) : (
					<motion.span
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.15, ease: 'easeOut' }}
						className='mt-3 px-4 py-2 inline-block border-2 border-accent rounded-xl font-medium text-sm text-muted leading-none tracking-tighter'
					>
						No image selected
					</motion.span>
				)}
				/
			</AnimatePresence>
		</>
	);
}
