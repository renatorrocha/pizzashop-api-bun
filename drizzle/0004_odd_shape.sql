ALTER TABLE "restaurants" DROP CONSTRAINT "restaurants_email_unique";--> statement-breakpoint
ALTER TABLE "restaurants" DROP COLUMN IF EXISTS "email";