import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { loginRequestSchema } from "@recipes/contracts";
import db from "../database/index.ts";
import type { User } from "../database/types/user.ts";

const router = Router();

router.post("/login", (req: Request, res: Response) => {
  const body = req.body;
  const result = loginRequestSchema.safeParse(body);

  if (!result.success) {
    return res.status(400).json({
      error: "User error",
    });
  }

  const item = db
    .prepare<string, User>("SELECT * FROM users WHERE username = ?;")
    .get(result.data.username);

  if (!item || item?.password !== body.password) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const secret = process.env.JWT_SECRET;

  if (secret === undefined) {
    return res.status(500).json({
      error: "Something went wrong",
    });
  }

  const token = jwt.sign(item, secret);

  return res.status(200).send({ token });
});

export default router;
