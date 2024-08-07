import { useEffect, useRef, useState } from 'react';
import ReactCrop, {
	centerCrop,
	convertToPixelCrop,
	makeAspectCrop,
	type Crop,
} from 'react-image-crop';

import { setCanvasPreview } from '../utils/helpers';

interface Props {
	imagePreview: string;
	minimumWidth?: number;
	onCrop?: (croppedImageData: string) => void;
	onCancel?: () => void;
}

export default function ImageCropper({
	imagePreview,
	minimumWidth = 128,
	onCrop,
	onCancel,
}: Props) {
	const imageRef = useRef<HTMLImageElement | null>(null);
	const cropperRef = useRef<IDialog | null>(null);
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const [crop, setCrop] = useState<Crop>();

	const onImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
		const { naturalWidth: width, naturalHeight: height } = event.currentTarget;

		const cropWidthPercentage =
			width * 0.25 < minimumWidth ? (minimumWidth / width) * 100 : 25;

		const crop = centerCrop(
			makeAspectCrop(
				{ unit: '%', width: cropWidthPercentage },
				1,
				width,
				height
			),
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

		onCrop(canvasRef.current.toDataURL());
		cropperRef.current.close();
	};

	useEffect(() => {
		if (!cropperRef.current) return;

		cropperRef.current.showModal();
	}, []);

	return (
		<dialog
			ref={cropperRef}
			onCancel={() => onCancel()}
			className='max-w-7xl p-2 justify-self-center top-1/2 transform -translate-y-1/2 bg-transparent overflow-hidden'
		>
			<div className='flex flex-col place-content-center place-items-center gap-6'>
				<ReactCrop
					crop={crop}
					onChange={(_crop, percentageCrop) => setCrop(percentageCrop)}
					aspect={1}
					minWidth={minimumWidth}
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
					className='w-24 py-3 font-medium text-base text-foreground leading-none tracking-tighter border-2 border-foreground rounded-md hover:text-background hover:bg-foreground transition-colors duration-150'
				>
					Crop Image
				</button>
			</div>
		</dialog>
	);
}
