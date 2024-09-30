import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/spare_parts" });

app.get("/getByID:id", async (id) => {
  return await db.$queryRaw`SELECT * FROM "spare_parts" WHERE "id" like ${id};`;
});

app.get("/getList", async () => {
  return await db.$queryRaw`SELECT "id", FROM "spare_parts";`;
});
// TODO List

// Insert ของใหม่
// แก้ไข ข้อมูล

export default app;
