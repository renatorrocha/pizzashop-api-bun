import { Elysia, t } from "elysia";
import { registerRestaurant } from "./routes/register-restaurant";
import swagger from "@elysiajs/swagger";
import { sendAuthLink } from "./routes/send-auth-link";
import jwt from "@elysiajs/jwt";
import { env } from "../env";
import cookie from "@elysiajs/cookie";

const app = new Elysia()
	.use(
		jwt({
			secret: env.JWT_SECRET_KEY,
			schema: t.Object({
				sub: t.String(), // Id do usuario
				restaurantId: t.Optional(t.String()),
			}),
		}),
	)
	.use(cookie({}))
	.use(registerRestaurant)
	.use(sendAuthLink)
	.use(swagger());

app.listen(3333, () => console.log("HTTP server running on port 3333!"));
