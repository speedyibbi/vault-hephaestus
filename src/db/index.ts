import { app } from 'electron';
import Database from 'better-sqlite3';
import path from 'path';

import { createAccountsTable, createFieldsTable } from './queries';
import { saveImage, validateAccount } from './helpers';

const dbPath = path.resolve(path.join(app.getPath('userData')), 'database.db');

const db = new Database(dbPath);

// todo: have an actual secret key

function openConnection() {
	db.pragma(`key = "${'secretKey'}"`);

	db.exec(createAccountsTable);
	db.exec(createFieldsTable);
}

function closeConnection() {
	db.close();
}

function addAccount(account: IAccount) {
	try {
		const { valid, error } = validateAccount(account);

		if (!valid) {
			throw new Error(error);
		}

		let imagePath = '';
		if (account.image && account.image.length > 0) {
			imagePath = saveImage(account.image, `${Date.now()}_${account.title}`);
		}

		const runTransaction = db.transaction(() => {
			const accountId = db
				.prepare(
					'INSERT INTO Accounts (title, image, favourite) VALUES (?, ?, ?)'
				)
				.run(account.title, imagePath, 0);

			const fieldNameRegex = /^field-\d+-name$/;
			const fieldCount = Object.entries(account).filter(([key, _value]) =>
				fieldNameRegex.test(key)
			).length;

			for (let i = 1; i <= fieldCount; i++) {
				addField({
					name: account[`field-${i}-name`],
					value: account[`field-${i}-value`],
					sensitive: account[`field-${i}-sensitive`] === 'on' ? 1 : 0,
					accountId: accountId.lastInsertRowid as number,
				});
			}
		});

		runTransaction();

		return { valid: true, error: '' };
	} catch (error) {
		return { valid: false, error: error.message };
	}
}

function addField({
	name,
	value,
	sensitive,
	accountId,
}: {
	name: string;
	value: string;
	sensitive: 1 | 0;
	accountId: number;
}) {
	db.prepare(
		'INSERT INTO Fields (name, value, sensitive, account_id) VALUES (?, ?, ?, ?)'
	).run(name, value, sensitive, accountId);
}

function fetchAccounts() {
	const rawAccounts = db
		.prepare(
			`SELECT *
		FROM Accounts
		JOIN Fields ON Accounts.id = Fields.account_id`
		)
		.all();

	const accounts: any = {};

	rawAccounts.forEach(
		({
			account_id,
			title,
			image,
			favourite,
			updated_at,
			created_at,
			name,
			value,
			sensitive,
		}: any) => {
			if (!accounts[account_id]) {
				accounts[account_id] = {
					account_id,
					title,
					image,
					favourite,
					updated_at,
					created_at,
					details: {},
				};
			}

			accounts[account_id].details[name] = { value, sensitive };
		}
	);

	return Object.values(accounts);
}

export default {
	db: db,
	openConnection,
	closeConnection,
	app: {
		addAccount,
		fetchAccounts,
	},
};
