import Database from 'better-sqlite3';
import path from 'path';

import { createAccountsTable, createFieldsTable } from './queries';

const dbPath = path.resolve(__dirname, 'database.db');

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

function addAccount({
	title,
	image,
	favourite,
}: {
	title: string;
	image: string;
	favourite: boolean;
}) {
	db.prepare(
		'INSERT INTO Accounts (title, image, favourite) VALUES (?, ?, ?)'
	).run(title, Buffer.from(image, 'utf-8'), favourite);
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
};
