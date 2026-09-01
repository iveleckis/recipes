import express, { type Express } from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";
import { handleSeedData, initDatabase } from "./database/index.ts";
import { authenticateToken } from "./middlewares/auth.ts";
import authRouter from "./routes/auth.ts";
import recipeRouter from "./routes/recipe.ts";

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,
});

const authRuoteLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 minutes
  limit: 3,
});

const app: Express = express();

app.use(helmet());
app.use(limiter);
app.use(express.json());

app.use("/auth", authRuoteLimiter, authRouter);
app.use("/recipes", authenticateToken, recipeRouter);

async function main() {
  try {
    initDatabase();
    handleSeedData();
    app.listen(3000);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
