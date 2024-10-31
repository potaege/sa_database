import { Elysia, t } from "elysia";
import db from "./db";

const app = new Elysia({
  prefix: "/spare_parts",
  detail: { tags: ["Spare Parts"] },
});

interface SparePart {
  id: number;
  name: string;
  description: string;
  price: number;
  unit: string;
  add_date: Date;
}

app.get("/getByID/:id", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","name","description","price","unit","add_date" FROM "Spare_parts" WHERE "id" = ${parseInt(
    params.id
  )};`;
});

app.get("/getList", async () => {
  return await db.$queryRaw`SELECT "id","name","description","price","unit","add_date" FROM "Spare_parts";`;
});

app.post(
  "/insertSparePart",
  async ({ body }: { body: SparePart }) => {
    try {
      const { name, description, price, unit } = body;

      await db.$queryRaw`INSERT INTO "Spare_parts" ("name","description","price","unit") VALUES (${name},${description},${price},${unit})`;
      return "add new spare parts";
    } catch (error: any) {
      return {
        error: "Error while creating spare parts",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      name: t.String(),
      description: t.String(),
      price: t.Number(),
      unit: t.String(),
    }),
  }
);

app.post(
  "/editSparePart",
  async ({ body }: { body: SparePart }) => {
    try {
      const { id, name, description, price, unit } = body;

      await db.$queryRaw`UPDATE "Spare_parts" SET "name" = ${name}, "description" = ${description}, "price" = ${price}, "unit" = ${unit} WHERE "id" = ${id}`;
      return "update spare parts data";
    } catch (error: any) {
      return {
        error: "Error while editing spare parts data",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      id: t.Number(),
      name: t.String(),
      description: t.String(),
      price: t.Number(),
      unit: t.String(),
    }),
  }
);
// TODO List

export default app;
