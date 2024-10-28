import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import db from "./db";

const app = new Elysia({ prefix: "/transactionLogs" });

interface Transaction_log {
  id: number;
  spare_parts: number;
  quantity: number;
  user_id: number;
  from_user_id: number;
  status: number;
  addDate: Date;
}

app.get("/getList", async () => {
  return await db.$queryRaw`SELECT "id","spare_parts","quantity","user_id","from_user_id","status","addDate" 
  FROM "Transaction_logs"`;
});

app.post(
  "/insertTransactionLog",
  async ({ body }: { body: Transaction_log }) => {
    try {
      const { spare_parts, quantity, user_id, from_user_id, status } = body;
      await db.$queryRaw`INSERT INTO "Transaction_logs" ("spare_parts","quantity","user_id","from_user_id","status") 
      VALUES (${spare_parts}, ${quantity}, ${user_id}, ${from_user_id}, ${status})`;
      return { message: "Transaction Log inserted successfully." };
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
