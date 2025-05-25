import { AccessControl } from "accesscontrol";
import { AuthenticatedRequest } from "./auth";
import { NextFunction, Response } from "express";

const ac = new AccessControl();

// Define roles and permissions
ac.grant("user").readOwn("todo");

ac.grant("admin")
  .extend("user")
  .createAny("todo")
  .readAny("todo")
  .updateAny("todo")
  .deleteAny("todo");

// RBAC Middleware
export const checkPermission = (
  action: string,
  resource: string,
  possession: "own" | "any" = "own"
) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    console.log(
      `Checking permission for action: ${action}, resource: ${resource}, possession: ${possession}, ${req.user?.role}`
    );
    try {
      const userRole = req.user?.role;
      console.log(`User role: ${userRole}`);
      if (!userRole) {
        return res.status(401).json({ error: "User role not found" });
      }
      let permission: any = {};
      if (possession === "own") {
        permission = ac.can(userRole)[`${action}Own`](resource);
      } else {
        permission = ac.can(userRole)[`${action}Any`](resource);
      }
      console.log(`Permission granted: ${permission.granted}`);
      if (!permission.granted) {
        return res.status(403).json({
          error: "Access denied. Insufficient permissions.",
          required: `${action}${
            possession === "own" ? "Own" : "Any"
          } ${resource}`,
          userRole: userRole,
        });
      }
      next();
    } catch (error) {
      console.error("Permission check error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};
