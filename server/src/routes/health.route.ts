import { Request, Response, Router } from "express";
import { pool } from "../config/db";

const router = Router();

router.get("/health", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    return res.json({
      status: 200,
      message: "Healthy",
      uptime: process.uptime(),
      dbName: result.rows[0].now,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 500,
      message: "Unhealthy",
    });
  }
});

export default router;
