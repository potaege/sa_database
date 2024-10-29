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
import middleware from "./middleware";

const app = new Elysia().use(
  swagger({
    documentation: {
      info: { title: "Easy service document", version: "1.0.0" },
      tags: [
        { name: "Users", description: "Users endpoint" },
        { name: "Spare Parts", description: "Spare Parts endpoint" },
        { name: "Customers", description: "Customers endpoint" },
        { name: "Work", description: "Work endpoint" },
        { name: "Request", description: "Request endpoint" },
        {
          name: "Spare Parts Request",
          description: "Spare Parts Request endpoint",
        },
        {
          name: "Spare Parts Engineers",
          description: "Spare Parts Engineers endpoint",
        },
        { name: "Transaction Log", description: "Transaction Log endpoint" },
        { name: "Additional Costs", description: "Additional Costs endpoint" },
      ],
    },
  })
);

app.use(middleware);
// app.use(auth);
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
