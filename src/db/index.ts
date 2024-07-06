import { app } from 'electron';
import Database from 'better-sqlite3';
import fs from 'fs/promises';
import path from 'path';

import { createAccountsTable, createFieldsTable } from './queries';
import { saveImage } from './helpers';

const dbPath = path.resolve(path.join(app.getPath('userData')), 'database.db');

const db = new Database(dbPath);

// todo: have an actual secret key
// todo: error handling in every function

function openConnection() {
	db.pragma(`key = "${'secretKey'}"`);

	db.exec(createAccountsTable);
	db.exec(createFieldsTable);
}

function closeConnection() {
	db.close();
}

async function addAccount(account: Account) {
	let imagePath = '';
	if (account.image && account.image.length > 0) {
		imagePath = await saveImage(
			account.image,
			`${Date.now()}_${account.title}`
		);
	}

	// const fieldNameRegex = /^field-\d+-name$/;
	// const fieldCount = Object.entries(account).filter(([key, _value]) =>
	// 	fieldNameRegex.test(key)
	// ).length;

	const info = db
		.prepare('INSERT INTO Accounts (title, image, favourite) VALUES (?, ?, ?)')
		.run(account.title, imagePath, 0);

	return info.lastInsertRowid;
}

function addField({
	name,
	value,
	sensitive,
	account_id,
}: {
	name: string;
	value: string;
	sensitive: boolean;
	account_id: number;
}) {
	db.prepare(
		'INSERT INTO Fields (name, value, sensitive, account_id) VALUES (?, ?, ?, ?)'
	).run(name, value, sensitive, account_id);
}

function fetchAcoounts() {
	return db.prepare('SELECT * FROM Accounts').all();
}

function fetchFields() {
	return db.prepare('SELECT * FROM Fields').all();
}

export default {
	db: db,
	openConnection,
	closeConnection,
	app: {
		addAccount,
	},
};
