import { type PixelCrop } from 'react-image-crop';

export function validateAccount(data: IAccount) {
	const alphanumericRegex = /^[a-zA-Z0-9 _-]+$/;
	const fieldNameRegex = /^field-\d+-name$/;

	if (!data.title) {
		return { valid: false, error: 'Title cannot be empty' };
	}

	if (!alphanumericRegex.test(data.title)) {
		return { valid: false, error: 'Title can only contain digits or letters' };
	}

	const fields = Object.entries(data).filter(([key, _value]) =>
		fieldNameRegex.test(key)
	);

	if (fields.length === 0) {
		return { valid: false, error: 'At least one field is required' };
	}

	for (const [_name, value] of fields) {
		if (!value || value.length === 0) {
			return { valid: false, error: 'Field name cannot be empty' };
		}

		if (!alphanumericRegex.test(value)) {
			return {
				valid: false,
				error: 'Field name can only contain digits or letters',
			};
		}
	}

	return { valid: true, error: '' };
}

export async function saveAccount(data: IAccount) {
	return await window.electron.saveAccount(JSON.stringify(data));
}

export function setCanvasPreview(
	image: HTMLImageElement,
	canvas: HTMLCanvasElement,
	crop: PixelCrop
) {
	const ctx = canvas.getContext('2d');

	if (!ctx) return;

	const pixelRatio = window.devicePixelRatio;
	const scaleX = image.naturalWidth / image.width;
	const scaleY = image.naturalHeight / image.height;

	canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
	canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

	ctx.scale(pixelRatio, pixelRatio);
	ctx.imageSmoothingQuality = 'high';
	ctx.save();

	const cropX = crop.x * scaleX;
	const cropY = crop.y * scaleY;

	ctx.translate(-cropX, -cropY);
	ctx.drawImage(
		image,
		0,
		0,
		image.naturalWidth,
		image.naturalHeight,
		0,
		0,
		image.naturalWidth,
		image.naturalHeight
	);

	ctx.restore();
}
