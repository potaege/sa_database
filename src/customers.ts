import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/customers" });

app.get("/getByID/:id", async (id: string) => {
  return await db.$queryRaw`SELECT "id","name","surname","company_name","credit_limit","address","tax_id,","tel" FROM "customers" WHERE id like ${id}`;
});

app.get("/getIDbynameAndSurnameOrCompanyName/:name/", async (name: string) => {
  return await db.$queryRaw`SELECT "id" FROM "customers" WHERE "name" like ${name}  `;
});

export default app;
