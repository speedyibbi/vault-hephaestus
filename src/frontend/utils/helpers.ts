import { type PixelCrop } from 'react-image-crop';

export async function saveAccount(data: IAccountData) {
	return JSON.parse(await window.electron.saveAccount(JSON.stringify(data)));
}

export async function loadAccounts() {
	return JSON.parse(await window.electron.loadAccounts());
}

export async function updateAccountFavouriteStatus(data: IAccountData) {
	return JSON.parse(
		await window.electron.updateAccountFavouriteStatus(JSON.stringify(data))
	);
}

export async function removeAccount(accountId: string) {
	return JSON.parse(await window.electron.removeAccount(accountId));
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

export function formatDateString(dateString: string) {
	const date = new Date(dateString);
	const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

	const day = String(localDate.getDate()).padStart(2, '0');
	const month = String(localDate.getMonth() + 1).padStart(2, '0');
	const year = localDate.getFullYear();

	let hours = localDate.getHours();
	const minutes = String(localDate.getMinutes()).padStart(2, '0');
	const meridian = hours >= 12 ? 'PM' : 'AM';

	hours = hours % 12 || 12;
	const formattedHours = String(hours).padStart(2, '0');

	return `${day}/${month}/${year} ${formattedHours}:${minutes}${meridian}`;
}
