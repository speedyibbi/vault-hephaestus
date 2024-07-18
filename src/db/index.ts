import { app } from 'electron';
import Database from 'better-sqlite3';
import path from 'path';

import { createAccountsTable, createFieldsTable } from './queries';
import {
	deleteFile,
	getFileExtension,
	readImage,
	saveImage,
	validateAccount,
} from './helpers';

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

function addAccount(account: IAccountData) {
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

function updateAccount(accountId: string, account: IAccountData) {
	try {
		const { valid, error } = validateAccount(account);

		if (!valid) {
			throw new Error(error);
		}

		let imagePath = '';

		const existingAccount: { image?: string } = db
			.prepare(`SELECT image FROM Accounts WHERE id = ?`)
			.get(accountId);

		if (account.image && account.image.length > 0) {
			if (existingAccount.image) {
				deleteFile(existingAccount.image);
			}
			imagePath = saveImage(account.image, `${Date.now()}_${account.title}`);
		} else {
			imagePath = existingAccount.image || '';
		}

		const runTransaction = db.transaction(() => {
			db.prepare(
				`UPDATE Accounts SET title = ?, image = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
			).run(account.title, imagePath, accountId);

			const deleteFieldsStmt = db.prepare(`
                DELETE FROM Fields 
                WHERE account_id = ?
            `);
			deleteFieldsStmt.run(accountId);

			const fieldNameRegex = /^field-\d+-name$/;
			const fieldCount = Object.entries(account).filter(([key, _value]) =>
				fieldNameRegex.test(key)
			).length;

			for (let i = 1; i <= fieldCount; i++) {
				addField({
					name: account[`field-${i}-name`],
					value: account[`field-${i}-value`],
					sensitive: account[`field-${i}-sensitive`] === 'on' ? 1 : 0,
					accountId: parseInt(accountId),
				});
			}
		});

		runTransaction();

		return { valid: true, error: '' };
	} catch (error) {
		return { valid: false, error: error.message };
	}
}

function updateAccountFavouriteStatus({ favourite, accountId }: IAccountData) {
	try {
		const accountUpdated = db
			.prepare('UPDATE Accounts SET favourite = ? WHERE id = ?')
			.run(favourite, accountId);

		return { updated: accountUpdated.changes > 0 };
	} catch (_error) {
		return { updated: false };
	}
}

function deleteAccount(accountId: string) {
	try {
		db.prepare('DELETE FROM Accounts WHERE id = ?').run(accountId);

		return { deleted: true };
	} catch (_error) {
		return { deleted: false };
	}
}

function fetchAccounts() {
	try {
		const rawAccounts = db
			.prepare(
				`SELECT *
		FROM Accounts
		JOIN Fields ON Accounts.id = Fields.account_id`
			)
			.all();

		const accounts: { [key: string]: IAccount } = {};

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
			}: IAccountData) => {
				let imageSrc;

				try {
					imageSrc =
						image.length > 0
							? `data:image/${getFileExtension(image)};base64,${readImage(
									image
							  )}`
							: '';
				} catch (_error) {
					imageSrc = '';
				}

				if (!accounts[account_id]) {
					accounts[account_id] = {
						account_id,
						title,
						image: imageSrc,
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
	} catch (_error) {
		return [];
	}
}

export default {
	db: db,
	openConnection,
	closeConnection,
	app: {
		addAccount,
		updateAccount,
		updateAccountFavouriteStatus,
		deleteAccount,
		fetchAccounts,
	},
};
