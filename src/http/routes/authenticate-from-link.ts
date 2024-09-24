import Elysia, { redirect, t } from "elysia";
import { db } from "../../db";
import { authLinks } from "../../db/schema";
import dayjs from "dayjs";
import { auth } from "../auth";
import { eq } from "drizzle-orm";

export const authenticateFromLink = new Elysia().use(auth).get(
	"/auth-links/authenticate",
	async ({ query, jwt, cookie: { auth }, set }) => {
		const { code, redirectUrl } = query;

		const authLinkFromCode = await db.query.authLinks.findFirst({
			where(fields, { eq }) {
				return eq(fields.code, code);
			},
		});

		if (!authLinkFromCode) throw new Error("Auth link not found.");

		const daysSinceAuthLinkWasCreated = dayjs().diff(
			authLinkFromCode.createAt,
			"days",
		);

		if (daysSinceAuthLinkWasCreated > 7) {
			throw new Error("Auth link expired, please generate a new one.");
		}

		const managedRestaurant = await db.query.restaurants.findFirst({
			where(fields, { eq }) {
				return eq(fields.managerId, authLinkFromCode.userId);
			},
		});

		const token = await jwt.sign({
			sub: authLinkFromCode.userId,
			restaurantId: managedRestaurant?.id,
		});

		auth.value = token;
		auth.httpOnly = true;
		auth.maxAge = 60 * 60 * 24 * 7; //7 days
		auth.path = "/";

		await db.delete(authLinks).where(eq(authLinks.code, code));

		return redirect(redirectUrl);
	},
	{
		query: t.Object({
			code: t.String(),
			redirectUrl: t.String(),
		}),
	},
);
