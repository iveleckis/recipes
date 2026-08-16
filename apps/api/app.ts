import express, { type Express, type Request, type Response } from "express";
import { handleSeedData, initDatabase } from "./database/index.ts";
import recipeRouter from "./routes/recipe.ts";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

app.use("/recipes", recipeRouter);

async function main() {
  try {
    initDatabase();
    handleSeedData(true);
    app.listen(3000);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
