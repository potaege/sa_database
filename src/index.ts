import { Elysia } from "elysia";
import user from "./user";
import auth from "./auth";
import spare_parts from "./spare_parts";
import customers from "./customers";
import work from "./work";
import request from "./request";
import spare_parts_request from "./spare_parts_request";
import swagger from "@elysiajs/swagger";

const app = new Elysia().use(
  swagger({
    documentation: {
      tags: [
        { name: "user", description: "user query api" },
        { name: "spare_parts", description: "spare parts query api" },
        { name: "customers", description: "customers query api" },
        { name: "work", description: "work query api" },
        {
          name: "spare_parts_request",
          description: "spare parts request query api",
        },
        { name: "request", description: "request query api" },
      ],
    },
  })
);

app.use(auth);
app.use(user);
app.use(spare_parts);
app.use(customers);
app.use(work);
app.use(request);
app.use(spare_parts_request);

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
