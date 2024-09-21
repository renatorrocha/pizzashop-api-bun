import { defineConfig, type Config } from "drizzle-kit";

export default defineConfig({
	schema: "./src/db/schema/index.ts",
	dialect: "postgresql",
	out: "./drizzle",
}) satisfies Config;
