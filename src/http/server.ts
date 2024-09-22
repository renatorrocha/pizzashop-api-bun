import { Elysia, t } from "elysia";
import { registerRestaurant } from "./routes/register-restaurant";
import swagger from "@elysiajs/swagger";
import { sendAuthLink } from "./routes/send-auth-link";

const app = new Elysia()
	.use(registerRestaurant)
	.use(sendAuthLink)
	.use(swagger());

app.listen(3333, () => console.log("HTTP server running on port 3333!"));
