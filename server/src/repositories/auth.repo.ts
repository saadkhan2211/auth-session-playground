import { pool } from "../config/db";

export const createUser = async (email: string, passowrd: string) => {
  const result = await pool.query(
    "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id",
    [email, passowrd]
  );

  return result.rows[0].id;
};

export const findUserByEmail = async (email: string) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return result.rows[0];
};

export const saveRefreshToken = async (
  id: string,
  token: string,
  expiresIn: Date
) => {
  const result = await pool.query(
    "INSERT INTO refresh_token (user_id, token, expires_at) VALUES ($1, $2, $3) RETURNING id",
    [id, token, expiresIn]
  );
  return result.rows[0].id;
};

export const findRefreshToken = async (token: string) => {
  const result = await pool.query(
    "SELECT * FROM refresh_token WHERE token = $1",
    [token]
  );
  return result.rows[0];
};
