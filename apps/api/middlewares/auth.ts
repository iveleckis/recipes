import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const secret = process.env.JWT_SECRET;

  if (secret === undefined) {
    console.error("JWT secret not found");
    return res.status(500).json({
      error: "Something went wrong",
    });
  }

  const [scheme, token] = req.headers["authorization"]?.split(" ") ?? [];

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, secret);

    if (typeof decoded === "string" || typeof decoded.id !== "number") {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    req.user = {
      id: decoded.id,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
}
