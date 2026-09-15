import express, { type Express } from "express";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import dotenv from "dotenv";
import { initDatabase } from "./database/index.ts";
import { authenticateToken } from "./middlewares/auth.ts";
import authRouter from "./routes/auth.ts";
import recipeRouter from "./routes/recipe.ts";

dotenv.config();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 50,
});

const authRouteLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 15,
});

const app: Express = express();

const clientUrl =
  process.env.MODE === "DEV"
    ? process.env.DEV_CLIENT_URL
    : process.env.CLIENT_URL;

if (!clientUrl) {
  throw new Error("Client URL is not configured");
}

app.use(
  cors({
    origin: clientUrl,
  }),
);

app.set("trust proxy", 2);

app.use(helmet());
app.use(limiter);

app.use("/auth", express.json({ limit: "10kb" }), authRouteLimiter, authRouter);
app.use("/recipes", express.json(), authenticateToken, recipeRouter);

async function main() {
  try {
    initDatabase();
    app.listen(Number(process.env.PORT) || 3000, "0.0.0.0");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
