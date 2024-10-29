import { Elysia, t } from "elysia";
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
  return await db.$queryRaw`SELECT "id","name","credit_limit","address","tax_id","tel","addDate","province" FROM "Customers"`;
});

app.get("/getByID/:id", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","name","credit_limit","address","tax_id","tel","addDate","province" FROM "Customers" WHERE id = ${parseInt(
    params.id
  )}`;
});

app.get("/getIDbyName/:name", async ({ params }) => {
  return await db.$queryRaw`SELECT "id" FROM "Customers" WHERE "name" like ${params.name}`;
});

app.post(
  "/addNewCustomer",
  async ({ body }: { body: Customer }) => {
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
  },
  {
    body: t.Object({
      name: t.String(),
      credit_limit: t.Number(),
      address: t.String(),
      tax_id: t.String(),
      tel: t.String(),
      province: t.String(),
    }),
  }
);

app.post(
  "/editCustomer",
  async ({ body }: { body: Customer }) => {
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
  },
  {
    body: t.Object({
      id: t.Number(),
      name: t.String(),
      credit_limit: t.Number(),
      address: t.String(),
      tax_id: t.String(),
      tel: t.String(),
      province: t.String(),
    }),
  }
);

export default app;
