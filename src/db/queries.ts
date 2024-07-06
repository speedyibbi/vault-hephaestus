export const createAccountsTable = `
      CREATE TABLE IF NOT EXISTS Accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        image TEXT,
        favourite BOOLEAN NOT NULL DEFAULT 0,
        updated_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
        created_at DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `;

export const createFieldsTable = `
      CREATE TABLE IF NOT EXISTS Fields (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        value TEXT,
        sensitive BOOLEAN NOT NULL DEFAULT 0,
        account_id INTEGER NOT NULL,
        FOREIGN KEY (account_id) REFERENCES Accounts(id) ON DELETE CASCADE
      )
    `;
