import { Elysia } from "elysia";
import user from "./users";
import auth from "./auth";
import spare_parts from "./spare_parts";
import customers from "./customers";
import work from "./work";
import request from "./request";
import spare_parts_request from "./spare_parts_request";
import spare_parts_engineers from "./spare_parts_engineer";
import Transaction_log from "./transactionLogs";
import AdditionalCost from "./additionalcosts";
import swagger from "@elysiajs/swagger";

const app = new Elysia().use(swagger);

app.use(auth);
app.use(user);
app.use(spare_parts);
app.use(customers);
app.use(work);
app.use(request);
app.use(spare_parts_request);
app.use(spare_parts_engineers);
app.use(Transaction_log);
app.use(AdditionalCost);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
