import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  createUser,
  findRefreshToken,
  findUserByEmail,
  saveRefreshToken,
} from "../repositories/auth.repo";
import { env } from "../config/env";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../libs/jwt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const checkUser = await findUserByEmail(email);

    if (!checkUser) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    const validatePassword = await bcrypt.compare(password, checkUser.password);
    if (!validatePassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password!",
      });
    }

    const accessToken = await generateAccessToken(checkUser.id);
    const refreshToken = await generateRefreshToken(checkUser.id);

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const saveToken = await saveRefreshToken(
      checkUser.id,
      refreshToken,
      expiresAt
    );

    if (!saveToken) {
      return res.status(400).json({
        success: false,
        message: "Failed to login",
      });
    }

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login Successful",
      token: accessToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, env.SALT_ROUND);
    const result = await createUser(email, hashedPassword);
    if (result) {
      return res.status(201).json({
        success: true,
        message: "User Created Successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to create user",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(404).json({
        success: false,
        message: "Session not found or expired!",
      });
    }
    const findToken = await findRefreshToken(refreshToken);
    if (!findToken) {
      return res.status(404).json({
        success: false,
        message: "Session not found or expired!",
      });
    }

    const payload = (await verifyRefreshToken(findToken.token)) as {
      userId: string;
    };

    const newToken = await generateAccessToken(payload.userId);
    return res.status(200).json({
      success: true,
      token: newToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const Auth = {
  login,
  signup,
  refresh,
};

export default Auth;
