import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { createUser } from "../repositories/auth.repo";
import { env } from "../config/env";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    return res.status(200).json({
      success: true,
      message: "Login Successful",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { email, passowrd } = req.body;
    const hashedPassword = await bcrypt.hash(passowrd, env.SALT_ROUND);
    const result = await createUser(email, hashedPassword);
    if (result.id) {
      return res.status(201).json({
        success: true,
        message: "User Created Successfully",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const Auth = {
  login,
  signup,
};

export default Auth;
