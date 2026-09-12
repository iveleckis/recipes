import { Router, type Request, type Response } from "express";
import {
  type GetRecipesResponse,
  type CreateRecipeResponse,
  type CreateRecipeRequest,
  type DeleteRecipeResponse,
  type DeleteRecipeParams,
  deleteRecipeParamsSchema,
  type GetRecipeResponse,
  type GetRecipeParams,
  getRecipeParamsSchema,
} from "@recipes/contracts";
import type { Recipe } from "../database/types/recipe.ts";
import db from "../database/index.ts";
import type { CustomError } from "../types/CustomError.ts";

const router = Router();

router.get<GetRecipesResponse>("/", (req, res) => {
  try {
    const rows = db
      .prepare<
        number,
        Pick<Recipe, "id" | "title">
      >("SELECT id, title FROM recipes WHERE user_id = ?;")
      .all(req.user.id);

    res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.get<GetRecipeParams, GetRecipeResponse | CustomError, {}, {}>(
  "/:id",
  (req, res) => {
    const result = getRecipeParamsSchema.safeParse(req.params);

    if (!result.success) {
      return res.status(400).json({ error: "Invalid recipe id" });
    }

    const id = result.data.id;

    try {
      const row = db
        .prepare<
          readonly [Recipe["user_id"], Recipe["id"]],
          Pick<Recipe, "id" | "title"> | undefined
        >("SELECT id, title FROM recipes WHERE user_id = ? AND id = ?;")
        .get([req.user.id, id]);

      if (!row) {
        return res.status(404).json({ error: "Recipe not found." });
      }

      res.status(200).json(row);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong." });
    }
  },
);

router.post<{}, CreateRecipeResponse | CustomError, CreateRecipeRequest, {}>(
  "/",
  (req, res) => {
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
          Recipe | undefined
        >("INSERT INTO recipes(user_id, title, description, prep_time_seconds) VALUES(?, ?, ?, ?) RETURNING *;")
        .get([req.user.id, body.title, "", body.prepTimeMinutes * 60]);

      if (result === undefined) {
        return res.status(500).json({ error: "Failed to create recipe" });
      }

      const responseMap: CreateRecipeResponse = {
        id: result.id,
        title: result.title,
        prepTimeMinutes: result.prep_time_seconds * 60,
        serves: 1,
        ingredients: [],
        method: [],
      };

      res.status(201).json(responseMap);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong." });
    }
  },
);

router.put("/:id", (req: Request, res: Response) => {
  const {
    params: { id },
    body,
  } = req;
  try {
    const row = db
      .prepare<
        readonly [
          Recipe["title"],
          Recipe["description"],
          Recipe["prep_time_seconds"],
          Recipe["user_id"],
          Recipe["id"],
        ],
        Recipe
      >("UPDATE recipes SET title = ?, description = ?, prep_time_seconds = ? WHERE user_id = ? AND id = ? RETURNING *;")
      .get([
        body.title,
        body.description,
        body.prep_time_seconds,
        req.user.id,
        Number(id),
      ]);

    if (!row) {
      return res.status(404).send({ error: "Recipe not found." });
    }

    res.status(200).json(row);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong." });
  }
});

router.delete<DeleteRecipeParams, DeleteRecipeResponse | CustomError, {}, {}>(
  "/:id",
  (req, res) => {
    const params = deleteRecipeParamsSchema.parse({
      id: Number(req.params.id),
    });

    try {
      const row = db
        .prepare<
          readonly [Recipe["user_id"], Recipe["id"]],
          Pick<Recipe, "id">
        >("DELETE FROM recipes WHERE user_id = ? AND id = ? RETURNING id;")
        .get([req.user.id, Number(params.id)]);

      if (!row) {
        return res.status(404).json({ error: "Recipe not found." });
      }

      res.status(200).json(row);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Something went wrong." });
    }
  },
);

export default router;
