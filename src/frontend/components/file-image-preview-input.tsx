import { useEffect, useRef, useState } from 'react';
import ReactCrop, {
	centerCrop,
	convertToPixelCrop,
	makeAspectCrop,
	type Crop,
} from 'react-image-crop';

import FileInput from './file-input';

import { setCanvasPreview } from '../utils/helpers';

import 'react-image-crop/dist/ReactCrop.css';

interface Props {
	id?: string;
	name?: string;
}

export default function FileImagePreviewInput({
	id = 'image',
	name = 'image',
}: Props) {
	const imageRef = useRef<HTMLImageElement | null>(null);
	const cropperRef = useRef<HTMLDialogElement | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [imagePreview, setImagePreview] = useState('');
	const [imageCropped, setImageCropped] = useState(false);
	const [crop, setCrop] = useState<Crop>();

	const imageSelectionHandler = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const file = event.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			setImagePreview(reader.result?.toString());
			setImageCropped(false);
		};
		reader.readAsDataURL(file);
	};

	const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const { naturalWidth: width, naturalHeight: height } = event.currentTarget;

		const crop = centerCrop(
			makeAspectCrop({ unit: '%', width: 25 }, 1, width, height),
			width,
			height
		);

		setCrop(crop);
	};

	const cropImage = () => {
		if (!cropperRef.current) return;

		setCanvasPreview(
			imageRef.current,
			canvasRef.current,
			convertToPixelCrop(crop, imageRef.current.width, imageRef.current.height)
		);

		setImagePreview(canvasRef.current.toDataURL().toString());
		setImageCropped(true);
		cropperRef.current.close();
	};

	useEffect(() => {
		if (!cropperRef.current || imageCropped) return;

		cropperRef.current.showModal();
	}, [imagePreview]);

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
						className='w-96 mt-3 inline-block border-2 border-accent rounded-full'
					/>
				) : (
					<dialog
						ref={cropperRef}
						className='max-w-7xl justify-self-center top-1/2 transform -translate-y-1/2 bg-transparent overflow-hidden'
					>
						<div className='flex flex-col place-content-center place-items-center gap-6'>
							<ReactCrop
								crop={crop}
								onChange={(_crop, percentageCrop) => setCrop(percentageCrop)}
								aspect={1}
								minWidth={128}
								circularCrop
								keepSelection
								className='block drop-shadow-2xl'
							>
								<img
									ref={imageRef}
									src={imagePreview}
									alt='image'
									className='w-full'
									style={{ maxHeight: '75vh' }}
									onLoad={onImageLoad}
								/>
							</ReactCrop>
							<canvas ref={canvasRef} className='hidden' />
							<button
								onClick={() => cropImage()}
								className='w-24 py-3 font-medium text-base text-white leading-none tracking-tighter border-2 border-white rounded-md hover:text-black hover:bg-white transition-colors duration-150'
							>
								Crop Image
							</button>
						</div>
					</dialog>
				)
			) : (
				<span className='mt-3 px-4 py-2 inline-block border-2 border-accent rounded-xl font-medium text-sm text-muted leading-none tracking-tighter'>
					No image selected
				</span>
			)}
		</>
	);
}
