import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

export interface JwtPayload {
  id: string;
  email: string;
}

export const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: "1h",
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET, {
    algorithms: ["HS256"],
  }) as JwtPayload;
};
