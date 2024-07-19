import { useEffect, useState } from 'react';

import ImageInput from './image-input';
import ImageCropper from './image-cropper';

import { useFlashStore } from '../utils/stores/flash-store';

import 'react-image-crop/dist/ReactCrop.css';

interface Props {
	id?: string;
	name?: string;
	onImageUpdate?: (imageData: string) => void;
	defaultImage?: string;
}

export default function FileImagePreviewInput({
	id = 'image',
	name = 'image',
	onImageUpdate,
	defaultImage,
}: Props) {
	const setFlash = useFlashStore((state) => state.setFlash);

	const [imagePreview, setImagePreview] = useState(defaultImage || '');
	const [imageCropped, setImageCropped] = useState(defaultImage ? true : false);

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
					setFlash({
						error: true,
						text: `Image must be at least ${minimumImageWidth}x${minimumImageWidth}px`,
					});
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
			<ImageInput
				id={id}
				name={name}
				onChange={imageSelectionHandler}
				imagePreview={imageCropped ? imagePreview : ''}
			/>
			{imagePreview.length > 0 && !imageCropped && (
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
			)}
		</div>
	);
}
