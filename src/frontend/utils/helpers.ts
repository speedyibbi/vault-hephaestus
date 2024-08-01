import { type PixelCrop } from 'react-image-crop';

export async function accessApplication(passcode: string) {
	return JSON.parse(await window.electron.accessApplication(passcode));
}

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

export async function updatePasscode(passcode: string) {
	return JSON.parse(await window.electron.updatePasscode(passcode));
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

export function generatePassword(options: {
	length?: number;
	uppercase?: boolean;
	lowercase?: boolean;
	digits?: boolean;
	specialChars?: boolean;
}) {
	const {
		length = 16,
		uppercase = true,
		lowercase = true,
		digits = false,
		specialChars = false,
	} = options;

	const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
	const digitChars = '0123456789';
	const specialCharsSet = '~`!@#$%^&*()_+-={[}|:;"\'<,>.?/]/';

	let allowedChars = '';
	if (uppercase) allowedChars += uppercaseChars;
	if (lowercase) allowedChars += lowercaseChars;
	if (digits) allowedChars += digitChars;
	if (specialChars) allowedChars += specialCharsSet;

	if (allowedChars.length === 0) {
		throw new Error('At least one character type should be included.');
	}

	let password = '';
	while (password.length < length) {
		const randomIndex = Math.floor(Math.random() * allowedChars.length);
		password += allowedChars[randomIndex];
	}

	const ensureCriteria = (criteria: boolean, chars: string) => {
		if (criteria && !RegExp(`[${chars}]`).test(password)) {
			password =
				password.slice(0, -1) + chars[Math.floor(Math.random() * chars.length)];
		}
	};

	ensureCriteria(uppercase, uppercaseChars);
	ensureCriteria(lowercase, lowercaseChars);
	ensureCriteria(digits, digitChars);
	ensureCriteria(specialChars, specialCharsSet);

	return password;
}

export async function generateAccountsCSV(accounts: IAccount[]) {
	let totalFields = 0;
	let maxFieldsIndex = 0;

	const accountData = accounts.map((account, idx) => {
		let fields: { [key: string]: string } = {};
		let fieldCount = 0;

		Object.entries(account.details).map(([key, value], idx) => {
			fields[`field-${idx + 1}-name`] = key;
			fields[`field-${idx + 1}-value`] = value.value;
			++fieldCount;
		});

		if (fieldCount > totalFields) {
			totalFields = fieldCount;
			maxFieldsIndex = idx;
		}

		return {
			title: account.title,
			...fields,
		};
	});

	const csvRows = [];
	const headers = Object.keys(accountData[maxFieldsIndex]);
	csvRows.push(headers.join(','));

	accountData.forEach((data: { [key: string]: string }) => {
		const values = headers.map((header) =>
			data[header] ? `"${data[header]}"` : ''
		);
		csvRows.push(values.join(','));
	});

	return csvRows.join('\n');
}
