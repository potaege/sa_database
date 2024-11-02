import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import db from "./db";

const app = new Elysia({
  prefix: "/transactionLogs",
  detail: { tags: ["Transaction Log"] },
});

interface Transaction_log {
  id: number;
  sparePart_id: number;
  quantity: number;
  user_id: number;
  from_user_id: number;
  status: number;
  add_date: Date;
}

app.get("/getList", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","sparePart_id","quantity","user_id","from_user_id","status","add_date" 
  FROM "Transaction_logs"`;
});

app.get("/getList/:id", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","sparePart_id","quantity","user_id","from_user_id","status","add_date" 
  FROM "Transaction_logs"
  WHERE "id" = ${params.id}`;
});

app.post(
  "/insertTransactionLog",
  async ({ body }: { body: Transaction_log }) => {
    try {
      const { sparePart_id, quantity, user_id, from_user_id } = body;
      await db.$queryRaw`INSERT INTO "Transaction_logs" ("sparePart_id","quantity","user_id","from_user_id","status") 
      VALUES $ {sparePart_id}, ${quantity}, ${user_id}, ${from_user_id}`;
      return { message: "Transaction Log inserted successfully." };
    } catch (error: any) {
      return {
        message: "Error inserting Transaction Log.",
        error: error.message,
      };
    }
  },
  {
    body: t.Object({
      sparePart_id: t.Number(),
      quantity: t.Number(),
      user_id: t.Number(),
      from_user_id: t.Number(),
    }),
  }
);

app.post(
  "/updateStatusTransactionLog",
  async ({ body }: { body: Transaction_log }) => {
    try {
      const { id, status } = body;
      await db.$queryRaw`UPDATE "Transaction_logs" SET status = ${status} WHERE id = ${id}`;
      return { message: "Transaction Log updated successfully." };
    } catch (error: any) {
      return {
        message: "Error inserting Transaction Log.",
        error: error.message,
      };
    }
  }
);

//TODO List

export default app;
