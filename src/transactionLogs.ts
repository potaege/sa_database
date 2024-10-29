import { Elysia, t } from "elysia";
import swagger from "@elysiajs/swagger";
import db from "./db";

const app = new Elysia({
  prefix: "/transactionLogs",
  detail: { tags: ["Transaction Log"] },
});

interface Transaction_log {
  id: number;
  spare_parts: number;
  quantity: number;
  user_id: number;
  from_user_id: number;
  status: number;
  addDate: Date;
}

app.get(
  "/getList",
  async ({ params }) => {
    return await db.$queryRaw`SELECT "id","spare_parts","quantity","user_id","from_user_id","status","addDate" 
  FROM "Transaction_logs"`;
  },
  {
    response: t.Object({
      id: t.Number(),
      spare_parts: t.Number(),
      quantity: t.Number(),
      user_id: t.Number(),
      from_user_id: t.Number(),
      status: t.Number(),
    }),
  }
);

app.post(
  "/insertTransactionLog",
  async ({ body }: { body: Transaction_log }) => {
    try {
      const { spare_parts, quantity, user_id, from_user_id } = body;
      await db.$queryRaw`INSERT INTO "Transaction_logs" ("spare_parts","quantity","user_id","from_user_id","status") 
      VALUES (${spare_parts}, ${quantity}, ${user_id}, ${from_user_id}`;
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
      spare_parts: t.Number(),
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
