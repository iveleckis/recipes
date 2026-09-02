import db from "../database/index.ts";

const username = process.env.SEED_USERNAME;
const password = process.env.SEED_PASSWORD;

if (!username || !password) {
  throw new Error("SEED_USERNAME and SEED_PASSWORD are required");
}

db.prepare(
  `
  INSERT INTO users (username, password)
  VALUES (?, ?)
`,
).run(username, password);
