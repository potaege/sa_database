import { Elysia } from "elysia";
import user from "./user";
import auth from "./auth";
import spare_parts from "./spare_parts";
import customers from "./customers";
import { swagger } from "@elysiajs/swagger";

const app = new Elysia().use(swagger());

app.use(auth);
app.use(user);
app.use(spare_parts);
app.use(customers);
app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
