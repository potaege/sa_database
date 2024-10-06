import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/customers" });

interface Customer {
  id: number;
  name: string;
  credit_limit: number;
  address: string;
  tax_id: string;
  tel: string;
  province: string;
}

app.get("/getByID/:id", async (id: string) => {
  return await db.$queryRaw`SELECT "id","name","surname","company_name","credit_limit","address","tax_id,","tel" FROM "customers" WHERE id like ${id}`;
});

app.get("/getIDbynameAndSurnameOrCompanyName/:name/", async (name: string) => {
  return await db.$queryRaw`SELECT "id" FROM "customers" WHERE "name" like ${name}  `;
});

app.post("/addNewUser", async ({ body }: { body: Customer }) => {
  try {
    const { name, credit_limit, address, tax_id, tel, province } = body;
    await db.$queryRaw`INSERT INTO "Customers" 
    ("name","credit_limit","address","tax_id","tel","province")
    VALUES (${name},${credit_limit},${address},${tax_id},${tel},${province})`;

    return "add new users";
  } catch (error: any) {
    return {
      error: "Error while creating user",
      details: error.message,
    };
  }
});

app.post("/editUser", async ({ body }: { body: Customer }) => {
  try {
    const { id, name, credit_limit, address, tax_id, tel, province } = body;

    await db.$queryRaw`UPDATE "Customers" SET "name" = ${name}, "credit_limit" = ${credit_limit}, address = ${address}, "tax_id" = ${tax_id}, "tel" = ${tel}, "province" = ${province}
    WHERE "id" like ${id} `;

    return "editing users data";
  } catch (error: any) {
    return {
      error: "Error while editing user data",
      details: error.message,
    };
  }
});

export default app;
