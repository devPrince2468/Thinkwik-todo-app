import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { AppError } from "../helpers/AppError";

// Observation:

// I've updated the authenticate middleware to correctly reflect the expected structure of the decoded JWT payload.

// Previously, the AuthenticatedRequest interface only included id, but role was also being assigned without type enforcement.

// I've updated the type to include both id and role:
// user?: { id: string; role: string }

// This ensures better type safety and consistency across the codebase.

export interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Missing or invalid token" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (error) {
    throw new AppError("Unauthorized", 401);
  }
};
