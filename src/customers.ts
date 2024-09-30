import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/customers" });

app.get("/getByID/:id", async (id: string) => {
  return await db.$queryRaw`SELECT "id","name","surname","company_name","credit_limit","address","tax_id,","tel" FROM "customers" WHERE id like ${id}`;
});

app.get(
  "/getIDbynameAndSurname/:name/:surname",
  async (name: string, surname: string) => {
    return await db.$queryRaw`SELECT "id" FROM "customers" WHERE name like ${name} AND surname like ${surname}`;
  }
);

export default app;
