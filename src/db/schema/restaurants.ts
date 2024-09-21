import { createId } from "@paralleldrive/cuid2";
import { text, timestamp, pgTable } from "drizzle-orm/pg-core";

export const restaurant = pgTable("restaurants", {
	id: text("id")
		.$defaultFn(() => createId())
		.primaryKey(),

	name: text("name").notNull(),
	description: text("description").notNull(),
	email: text("email").notNull().unique(),

	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
