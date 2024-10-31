import { Elysia, t } from "elysia";
import db from "./db";

const app = new Elysia({
  prefix: "/additionalcosts",
  detail: { tags: ["Additional Costs"] },
});

interface Additionalcost {
  id: number;
  description: string;
  cost: number;
  amount: number;
  unit: string;
  work_id: string;
  add_date: Date;
}

app.get("/getFromWorkId/:workid", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","description","cost","amount","unit","work_id","add_date" FROM "additional_costs" WHERE "work_id" = ${parseInt(
    params.workid
  )};`;
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
  },
  {
    body: t.Object({
      description: t.String(),
      cost: t.Number(),
      amount: t.Number(),
      unit: t.String(),
      work_id: t.String(),
      add_date: t.Date(),
    }),
  }
);

app.post(
  "/editAdditionalCost",
  async ({ body }: { body: Additionalcost }) => {
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
  },
  {
    body: t.Object({
      id: t.Number(),
      description: t.String(),
      cost: t.Number(),
      amount: t.Number(),
      unit: t.String(),
      work_id: t.String(),
      add_date: t.Date(),
    }),
  }
);

app.post(
  "/deleteAdditionalCost",
  async ({ body }: { body: Additionalcost }) => {
    try {
      const { id } = body;
      await db.$queryRaw`DELETE FROM "additional_costs" WHERE "id" = ${id}`;
      return "delete additional cost";
    } catch (error: any) {
      return {
        error: "Error while deleting additional cost",
        details: error.message,
      };
    }
  }
);
//TODO List

export default app;
