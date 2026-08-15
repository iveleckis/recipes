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

export default router;
