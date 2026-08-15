import { Router, type Request, type Response } from "express";
import db from "../database/index.ts";

const router = Router();

const MOCK_USER_ID = 1;

router.get("/", (req: Request, res: Response) => {
  try {
    const rows = db
      .prepare("SELECT * FROM recipes WHERE user_id = ?;")
      .all(MOCK_USER_ID);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

type Recipe = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: string;
  prep_time_seconds: number;
};

router.post("/", (req: Request, res: Response) => {
  const body = req.body;
  try {
    const result = db
      .prepare<
        readonly [
          Recipe["user_id"],
          Recipe["title"],
          Recipe["description"],
          Recipe["prep_time_seconds"],
        ],
        Recipe
      >("INSERT INTO recipes(user_id, title, description, prep_time_seconds) VALUES(?, ?, ?, ?) RETURNING *;")
      .get([
        MOCK_USER_ID,
        body.title,
        body.description,
        body.prep_time_seconds,
      ]);

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

export default router;
