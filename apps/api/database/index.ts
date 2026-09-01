import type { User } from "@recipes/contracts";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

const db = new Database("./data/app.db");

export function initDatabase(): void {
  db.pragma("foreign_keys = on");
  const file = path.join(import.meta.dirname + "/schema.sql");
  const content = fs.readFileSync(file).toString();
  db.exec(content);
}

function seedUser(): void {
  try {
    db.prepare<[string, string], void>(
      "INSERT INTO users(username, password) VALUES (?, ?);",
    ).run("Ignas", "testpwd123");
    console.log("user inserted");
    db.prepare<[string, string], void>(
      "INSERT INTO users(username, password) VALUES (?, ?);",
    ).run("Kamile", "kamile123");
    console.log("user inserted");
  } catch (err) {
    console.error(err);
  }
}

type InsertRecipeArgs = readonly [number, string, string, number];

function seedRecipe() {
  try {
    const users = db
      .prepare<[], { id: User["id"] }>("select id from users;")
      .all();
    if (users === undefined) throw new Error("User select error");

    users.forEach((user) => {
      db.prepare<InsertRecipeArgs, void>(
        "INSERT INTO recipes(user_id, title, description, prep_time_seconds) VALUES (?, ?, ?, ?);",
      ).run([user.id, "Test Recipe", "Lorem ipsum sit", 600]);
      console.log("recipe inserted");
    });
  } catch (err) {
    console.error(err);
  }
}

export function handleSeedData(skip = false) {
  if (skip) return;

  const shouldSeedUser = !Boolean(db.prepare("select * from users;").get());

  if (shouldSeedUser) {
    seedUser();
  }

  const shouldSeedRecipe = !Boolean(db.prepare("select * from recipes;").get());
  if (shouldSeedRecipe) {
    seedRecipe();
  }
}

export default db;
