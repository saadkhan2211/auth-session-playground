import "dotenv/config";

export const env = {
  PORT: process.env.PORT || 5000,
  DATABASE_URL: process.env.DATABASE_URL as string,
  SALT_ROUND: parseInt(process.env.SALT_ROUND!),
  JWT_SECRECT: process.env.JWT_SECRECT as string,
  JWT_REFRESH_SECRET: process.env.REFRESH_TOKEN as string,
};
