import { useState } from 'react';

import FileInput from './file-input';
import ImageCropper from './image-cropper';

import 'react-image-crop/dist/ReactCrop.css';

interface Props {
	id?: string;
	name?: string;
}

export default function FileImagePreviewInput({
	id = 'image',
	name = 'image',
}: Props) {
	const [imagePreview, setImagePreview] = useState('');
	const [imageCropped, setImageCropped] = useState(false);

	const imageSelectionHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			setImageCropped(false);
			setImagePreview(reader.result?.toString());
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
			{imagePreview.length > 0 ? (
				imageCropped ? (
					<img
						src={imagePreview}
						alt='image'
						className='w-64 mt-3 inline-block border-2 border-accent rounded-full'
					/>
				) : (
					<ImageCropper
						imagePreview={imagePreview}
						onCrop={(croppedImageData) => {
							setImagePreview(croppedImageData.toString());
							setImageCropped(true);
						}}
						onCancel={() => {
							setImagePreview('');
							setImageCropped(false);
						}}
					/>
				)
			) : (
				<span className='mt-3 px-4 py-2 inline-block border-2 border-accent rounded-xl font-medium text-sm text-muted leading-none tracking-tighter'>
					No image selected
				</span>
			)}
		</>
	);
}
