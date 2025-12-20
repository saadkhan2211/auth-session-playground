import { pool } from "../config/db";

export const createUser = async (email: string, passowrd: string) => {
  try {
    const result = await pool.query(
      "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
      [email, passowrd]
    );

    return result.rows[0].id;
  } catch (error) {
    return error;
  }
};
