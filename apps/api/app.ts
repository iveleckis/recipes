import express, { type Express, type Request, type Response } from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { handleSeedData, initDatabase } from "./database/index.ts";
import recipeRouter from "./routes/recipe.ts";

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,
});

const app: Express = express();

app.use(helmet());
app.use(limiter);
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
