export const QUERIES = {
  mock: {
    createUsersTable: `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL
      )`,
    createUser: `INSERT INTO users(name, email) VALUES(?, ?)`,
  },
};
