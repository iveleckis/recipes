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
    db.prepare<string, void>("INSERT INTO users(name) VALUES (?);").run(
      "Ignas",
    );
    console.log("user inserted");
  } catch (err) {
    console.error(err);
  }
}

type InsertRecipeArgs = readonly [number, string, string, number];

function seedRecipe() {
  try {
    const row = db.prepare<[], { id: number }>("select id from users;").get();
    if (row?.id === undefined) throw new Error("User select error");

    db.prepare<InsertRecipeArgs, void>(
      "INSERT INTO recipes(user_id, title, description, prep_time_seconds) VALUES (?, ?, ?, ?);",
    ).run([row.id, "Test Recipe", "Lorem ipsum sit", 600]);
    console.log("recipe inserted");
  } catch (err) {
    console.error(err);
  }
}

export function handleSeedData() {
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
