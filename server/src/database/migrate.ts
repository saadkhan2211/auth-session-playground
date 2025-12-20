import path from "path";
import fs from "fs";
import { pool } from "../config/db";

const runMigration = async () => {
  const migrationDir = path.join(__dirname, "migrations");
  const files = fs.readdirSync(migrationDir).sort();
  for (const file of files) {
    const sql = fs.readFileSync(path.join(migrationDir, file), {
      encoding: "utf-8",
    });
    console.log(`Running migration: ${file}`);
    await pool.query(sql);
  }
  console.log("Migration Completed!");
  process.exit(0);
};

runMigration();
