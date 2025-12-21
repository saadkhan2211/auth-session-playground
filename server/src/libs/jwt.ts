import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const generateAccessToken = async (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    env.JWT_SECRECT,
    { expiresIn: "15m" }
  );
};

export const generateRefreshToken = async (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    env.JWT_SECRECT,
    { expiresIn: "7d" }
  );
};

export const verifyRefreshToken = async (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};
