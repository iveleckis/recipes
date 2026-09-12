import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import type { User } from "./types/user.ts";
import { migrations } from "./migrations/index.ts";
import type { Version } from "./types/version.ts";

const dbPath = process.env.RAILWAY_VOLUME_MOUNT_PATH
  ? `${process.env.RAILWAY_VOLUME_MOUNT_PATH}/data.db`
  : "./data/app.db";
const db = new Database(dbPath);

function readMigration(pathToFile: string): string {
  const file = path.join(import.meta.dirname + pathToFile);
  const content = fs.readFileSync(file).toString();

  return content;
}

function getDbVersion(): number {
  const tableExists = db
    .prepare(
      "SELECT 1 FROM sqlite_master WHERE type = 'table' AND name = 'schema_migrations'",
    )
    .get();

  if (!tableExists) {
    return 0;
  }

  const result = db
    .prepare<[], Version | undefined>("SELECT version FROM schema_migrations;")
    .get();

  return result?.version ?? 0;
}

function updateDbVersion(currentVersion: number): number {
  const dbVersion = db
    .prepare<[], Version>("SELECT version FROM schema_migrations LIMIT 1;")
    .get();

  if (dbVersion === undefined) {
    db.prepare<number, void>(
      "INSERT INTO schema_migrations(version) VALUES (?)",
    ).run(currentVersion);
  } else {
    db.prepare(`UPDATE schema_migrations SET version = ?;`).run(currentVersion);
  }

  const result = db
    .prepare<[], Version>("SELECT version FROM schema_migrations;")
    .get();
  if (result === undefined) {
    throw new Error("DB version not found");
  }

  return result.version;
}

function runMigrations() {
  let version = getDbVersion();

  migrations
    .toSorted((a, b) => a.version - b.version)
    .forEach((migration) => {
      if (migration.version > version) {
        const migrate = db.transaction(() => {
          db.exec(readMigration("/migrations" + migration.file));
          updateDbVersion(migration.version);
        });

        migrate();
        version = migration.version;
      }
    });
}

export function initDatabase(): void {
  try {
    db.pragma("foreign_keys = on");

    const version = getDbVersion();

    if (version === 0) {
      const init = db.transaction(() => {
        db.exec(readMigration("/schema.sql"));
        updateDbVersion(1);
      });

      init();
    }

    runMigrations();
  } catch (err) {
    console.error("Database initialization failed:", err);
    throw err;
  }
}

export default db;
