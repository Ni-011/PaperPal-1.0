import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { error } from "console";

neonConfig.fetchConnectionCache = true;

if (!process.env.DB_URL) {
  throw new Error("DB_URL is not found");
}

const sql = neon(process.env.DB_URL);

export const DB = drizzle(sql);
