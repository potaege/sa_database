import { Elysia } from "elysia";
import swagger from "@elysiajs/swagger";
import db from "./db";

const app = new Elysia({ prefix: "/additionalcost" });

interface Additionalcost {
  id: number;
  description: string;
  cost: number;
  amount: number;
  unit: string;
  work_id: string;
}

app.get("/getFromWorkId/:workid", async (workID) => {
  return await db.$queryRaw`SELECT "id","description","cost","amount","unit","work_id" FROM "additional_costs" WHERE "work_id" = ${workID};`;
});

app.post(
  "/insertAdditionalCost",
  async ({ body }: { body: Additionalcost }) => {
    try {
      const { description, cost, amount, unit, work_id } = body;

      await db.$queryRaw`INSERT INTO "additional_costs" ("description","cost","amount","unit","work_id") VALUES (${description},${cost},${amount},${unit},${work_id})`;
      return "add new additional cost";
    } catch (error: any) {
      return {
        error: "Error while creating additional cost",
        details: error.message,
      };
    }
  }
);

app.post("/editAdditionalCost", async ({ body }: { body: Additionalcost }) => {
  try {
    const { id, description, cost, amount, unit, work_id } = body;

    await db.$queryRaw`UPDATE "additional_costs" SET "description" = ${description}, "cost" = ${cost}, "amount" = ${amount}, "unit" = ${unit}, "work_id" = ${work_id} WHERE "id" = ${id}`;
    return "edit additional cost";
  } catch (error: any) {
    return {
      error: "Error while editing additional cost",
      details: error.message,
    };
  }
});

//TODO List

export default app;
