import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/spare_parts" });

interface SparePart {
  id: number;
  name: string;
  description: string;
}

app.get("/getByID/:id", async (id: string) => {
  return await db.$queryRaw`SELECT * FROM "spare_parts" WHERE "id" like ${id};`;
});

app.get("/getList", async () => {
  return await db.$queryRaw`SELECT "id","name" FROM "spare_parts";`;
});

app.post("/insertSparePart", async ({ body }: { body: SparePart }) => {
  try {
    const { name, description } = body;

    await db.$queryRaw`INSERT INTO "Spare_parts" ("name","description") VALUES (${name},${description})`;
    return "add new spare parts";
  } catch (error: any) {
    return {
      error: "Error while creating spare parts",
      details: error.message,
    };
  }
});

app.post("/editSparePart", async ({ body }: { body: SparePart }) => {
  try {
    const { id, name, description } = body;

    await db.$queryRaw`UPDATE "Spare_parts" SET "name" = ${name}, "description" = ${description} WHERE "id" like ${id}`;
    return "update spare parts data";
  } catch (error: any) {
    return {
      error: "Error while editing spare parts data",
      details: error.message,
    };
  }
});
// TODO List

export default app;
