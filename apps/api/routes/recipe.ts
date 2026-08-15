import { Router, type Request, type Response } from "express";
import db from "../database/index.ts";

const router = Router();

const MOCK_USER_ID = 1;

type Recipe = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  created_at: string;
  prep_time_seconds: number;
};

router.get("/", (req: Request, res: Response) => {
  try {
    const rows = db
      .prepare<number, Recipe>("SELECT * FROM recipes WHERE user_id = ?;")
      .all(MOCK_USER_ID);
    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const row = db
      .prepare<
        readonly [number, number],
        Recipe
      >("SELECT * FROM recipes WHERE user_id = ? AND id = ?;")
      .get([MOCK_USER_ID, Number(id)]);

    if (!row) {
      return res.status(404).json({ error: "Recipe not found." });
    }

    res.status(200).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

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
