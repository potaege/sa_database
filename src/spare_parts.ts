import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/spare_parts" });

interface SpareParts {
  name: string;
  description: string;
}

app.get("/getByID:id", async (id) => {
  return await db.$queryRaw`SELECT * FROM "spare_parts" WHERE "id" like ${id};`;
});

app.get("/getList", async () => {
  return await db.$queryRaw`SELECT "id", FROM "spare_parts";`;
});
// TODO List

// Insert ของใหม่
// แก้ไข ข้อมูล

app.post("/insertSpareParts", async ({ body }: { body: SpareParts }) => {
  try {
    const { name, description } = body;

    await db.$queryRaw`INSERT INTO "Spare_parts" ("name","description") VALUES (${name},${description})`;
    return "add new spare parts";
  } catch (error: any) {
    return {
      error: "Error while creating user",
      details: error.message,
    };
  }
});

export default app;
