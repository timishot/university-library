import config from "@/lib/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

const sql = neon(
  "postgresql://library_owner:DgE2h4YqmjBk@ep-holy-glade-a5pcoi8p.us-east-2.aws.neon.tech/library?sslmode=require",
);

export const db = drizzle({ client: sql, casing: "snake_case" });
