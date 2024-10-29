import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({
  prefix: "/customers",
  detail: { tags: ["Customers"] },
});

interface Customer {
  id: number;
  name: string;
  credit_limit: number;
  address: string;
  tax_id: string;
  tel: string;
  province: string;
  addDate: Date;
}

app.get("/getList", async () => {
  return await db.$queryRaw`SELECT "id","name","credit_limit","address","tax_id,","tel","addDate" FROM "Customers"`;
});

app.get("/getByID/:id", async (id: string) => {
  return await db.$queryRaw`SELECT "id","name","credit_limit","address","tax_id,","tel","addDate" FROM "Customers" WHERE id = ${id}`;
});

app.get(
  "/getIDbynameAndSurname/:name/:/surname",
  async (name: string, surname: string) => {
    return await db.$queryRaw`SELECT "id" FROM "Customers" WHERE "name" like ${name} && "surname" like ${surname}`;
  }
);

app.get("/getIDbyCompanyName/:companyName", async (companyName: string) => {
  return await db.$queryRaw`SELECT "id" FROM "Customers" WHERE "company_name" like ${companyName}`;
});

app.post("/addNewCustomer", async ({ body }: { body: Customer }) => {
  try {
    const { name, credit_limit, address, tax_id, tel, province } = body;

    await db.$queryRaw`INSERT INTO "Customers" 
    ("name","surname","company_name","credit_limit","address","tax_id","tel","province")
    VALUES (${name},${credit_limit},${address},${tax_id},${tel},${province})`;

    return "add new users";
  } catch (error: any) {
    return {
      error: "Error while creating user",
      details: error.message,
    };
  }
});

app.post("/editCustomer", async ({ body }: { body: Customer }) => {
  try {
    const { id, name, credit_limit, address, tax_id, tel, province } = body;

    await db.$queryRaw`UPDATE "Customers" SET "name" = ${name},"credit_limit" = ${credit_limit}, address = ${address}, "tax_id" = ${tax_id}, "tel" = ${tel}, "province" = ${province}
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
