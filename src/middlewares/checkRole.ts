import { NextFunction, Request, Response } from "express";
import { roles } from "../constants/Enums";
import { AppError } from "../helpers/AppError";

// Extend Express Request interface to include user with role
declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: string;
    };
  }
}
export const isValidRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (role && roles.includes(role)) {
      if (allowedRoles.includes(role)) {
        next();
      } else {
        throw new AppError("Access denied", 403);
      }
    } else {
      throw new AppError("Forbidden", 403);
    }
  };
};
