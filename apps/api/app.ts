import express, { type Express, type Request, type Response } from "express";
import { initDatabase } from "./database/index.ts";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

async function main() {
  try {
    initDatabase();
    app.listen(3000);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
