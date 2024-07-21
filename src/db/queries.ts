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

export const createAccountsAuditTable = `
  CREATE TABLE IF NOT EXISTS Accounts_Audit (
    audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id INTEGER,
    title TEXT NOT NULL,
    image TEXT,
    favourite BOOLEAN NOT NULL DEFAULT 0,
    updated_at DATE NOT NULL,
    created_at DATE NOT NULL,
    operation TEXT NOT NULL,
    change_timestamp DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

export const createFieldsAuditTable = `
  CREATE TABLE IF NOT EXISTS Fields_Audit (
    audit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    id INTEGER,
    name TEXT NOT NULL,
    value TEXT,
    sensitive BOOLEAN NOT NULL DEFAULT 0,
    account_id INTEGER NOT NULL,
    operation TEXT NOT NULL,
    change_timestamp DATE NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`;

export const createAccountsUpdateAuditTrigger = `
  CREATE TRIGGER IF NOT EXISTS Accounts_Update_Audit
  AFTER UPDATE ON Accounts
  FOR EACH ROW
  BEGIN
    INSERT INTO Accounts_Audit (id, title, image, favourite, updated_at, created_at, operation)
    VALUES (OLD.id, OLD.title, OLD.image, OLD.favourite, OLD.updated_at, OLD.created_at, 'UPDATE');
  END;
`;

export const createAccountsDeleteAuditTrigger = `
  CREATE TRIGGER IF NOT EXISTS Accounts_Delete_Audit
  AFTER DELETE ON Accounts
  FOR EACH ROW
  BEGIN
    INSERT INTO Accounts_Audit (id, title, image, favourite, updated_at, created_at, operation)
    VALUES (OLD.id, OLD.title, OLD.image, OLD.favourite, OLD.updated_at, OLD.created_at, 'DELETE');
  END;
`;

export const createFieldsUpdateAuditTrigger = `
  CREATE TRIGGER IF NOT EXISTS Fields_Update_Audit
  AFTER UPDATE ON Fields
  FOR EACH ROW
  BEGIN
    INSERT INTO Fields_Audit (id, name, value, sensitive, account_id, operation)
    VALUES (OLD.id, OLD.name, OLD.value, OLD.sensitive, OLD.account_id, 'UPDATE');
  END;
`;

export const createFieldsDeleteAuditTrigger = `
  CREATE TRIGGER IF NOT EXISTS Fields_Delete_Audit
  AFTER DELETE ON Fields
  FOR EACH ROW
  BEGIN
    INSERT INTO Fields_Audit (id, name, value, sensitive, account_id, operation)
    VALUES (OLD.id, OLD.name, OLD.value, OLD.sensitive, OLD.account_id, 'DELETE');
  END;
`;
