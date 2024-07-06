import { app } from 'electron';
import fs from 'fs';
import path from 'path';

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
		throw err;
	});
	fs.writeFile(imagePath, imageBuffer, {}, (err) => {
		throw err;
	});

	return imagePath;
}
