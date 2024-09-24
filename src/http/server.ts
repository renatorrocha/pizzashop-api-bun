import { Elysia, t } from "elysia";
import { registerRestaurant } from "./routes/register-restaurant";
import swagger from "@elysiajs/swagger";
import { sendAuthLink } from "./routes/send-auth-link";
import jwt from "@elysiajs/jwt";
import { env } from "../env";
import cookie from "@elysiajs/cookie";
import { authenticateFromLink } from './routes/authenticate-from-link';

const app = new Elysia()
	.use(registerRestaurant)
	.use(sendAuthLink)
	.use(authenticateFromLink)
	.use(swagger());

app.listen(3333, () => console.log("HTTP server running on port 3333!"));
