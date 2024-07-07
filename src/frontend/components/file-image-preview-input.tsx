import { useEffect, useState } from 'react';

import FileInput from './file-input';
import ImageCropper from './image-cropper';

import 'react-image-crop/dist/ReactCrop.css';

interface Props {
	id?: string;
	name?: string;
	onImageUpdate?: (imageData: string) => void;
}

export default function FileImagePreviewInput({
	id = 'image',
	name = 'image',
	onImageUpdate,
}: Props) {
	const [imagePreview, setImagePreview] = useState('');
	const [imageCropped, setImageCropped] = useState(false);

	const minimumImageWidth = 128;

	const imageSelectionHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			const img = new Image();
			img.onload = () => {
				if (img.width < minimumImageWidth || img.height < minimumImageWidth) {
					// error msg
				} else {
					setImageCropped(false);
					setImagePreview(reader.result?.toString());
				}
			};
			img.src = reader.result?.toString();
		};
		reader.readAsDataURL(file);
	};

	useEffect(() => {
		onImageUpdate?.(imagePreview);
	}, [imagePreview]);

	return (
		<div className='w-full'>
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
						className='w-48 mt-3 inline-block border-2 border-accent rounded-full'
					/>
				) : (
					<ImageCropper
						imagePreview={imagePreview}
						minimumWidth={minimumImageWidth}
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
		</div>
	);
}
