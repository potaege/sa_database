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
  return await db.$queryRaw`SELECT "id","name","credit_limit","address","tax_id","tel","addDate","province" FROM "Customers" ORDER BY "id" ASC`;
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
  "/edit",
  async ({body}) => {
    try {
      const customerList: Customer[] =
        await db.$queryRaw`SELECT "id","name","credit_limit","address","tax_id","tel","province" FROM "Customers" WHERE "id" = ${body.id} LIMIT 1`;
      const customer: Customer = customerList[0];

      await db.$queryRaw`
      UPDATE "Customers" 
      SET "name" = ${body.name || customer.name},"credit_limit" = ${body.credit_limit || customer.credit_limit}, address = ${body.address || customer.address}, "tax_id" = ${body.tax_id || customer.tax_id}, "tel" = ${body.tel || customer.tel}, "province" = ${body.province || customer.province}
      WHERE "id" = ${body.id} 
      `;

      return {
        message: "User data updated",
        data: {
          id: body.id,
          name: body.name || customer.name,
        }
      }
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
      name: t.Optional(t.String()),
      credit_limit: t.Optional(t.Number()),
      address: t.Optional(t.String()),
      tax_id: t.Optional(t.String()),
      tel: t.Optional(t.String()),
      province: t.Optional(t.String()),
    }),
  }
);

export default app;
