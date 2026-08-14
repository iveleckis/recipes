import Database from "better-sqlite3";
import { QUERIES } from "./queries.ts";

const db = new Database("./data/app.db");

export function initDatabase(): void {
  db.exec(QUERIES.mock.createUsersTable);
}

export default db;
