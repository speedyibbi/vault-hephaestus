import { app } from 'electron';
import fs from 'fs';
import path from 'path';

export function validateAccount(data: IAccountData) {
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

export function saveImage(imageBase64: string, imageName: string) {
	const match = imageBase64.match(/^data:image\/(\w+);base64,/);
	const imageExtension = match ? match[1] : '';

	const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, '');
	const imageBuffer = Buffer.from(base64Data, 'base64');

	const imagePath = path.resolve(
		path.join(app.getPath('userData')),
		'images',
		`${imageName}.${imageExtension}`
	);

	const dirPath = path.dirname(imagePath);
	fs.mkdir(dirPath, { recursive: true }, (err) => {
		if (err) {
			throw err;
		}
	});
	fs.writeFile(imagePath, imageBuffer, {}, (err) => {
		if (err) {
			throw err;
		}
	});

	return imagePath;
}

export function readImage(imagePath: string) {
	return fs.readFileSync(imagePath, { encoding: 'base64' });
}
