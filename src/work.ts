import { Elysia, t } from "elysia";

import db from "./db";

const app = new Elysia({ prefix: "/works", detail: { tags: ["Work"] } });

interface Work {
  id: string;
  mail_date: Date;
  service_date: Date;
  status: number;
  customerID: number;
  address: string;
  province: string;
  userID: string;
}

app.post("/createNewWork", async ({ body }: { body: Work }) => {
  try {
    const { mail_date, service_date, customerID, address, province } = body;

    await db.$queryRaw`INSERT INTO "Works" 
    ("mail_date","service_date","customerID","address","province")
    VALUES (${mail_date},${service_date},${customerID},${address},${province});`;
    return "add new work";
  } catch (error: any) {
    return {
      error: "Error while creating work",
      details: error.message,
    };
  }
});

app.get("/searchByID/:id", async (id) => {
  return await db.$queryRaw`SELECT "id","mail_date","service_date","status","userID","customerID","address","province","inWarranty","addDate" 
  FROM "Works" WHERE "id" like ${id}`;
});

app.get("/getWorksList", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","mail_date","service_date","status","userID","customerID","address","province","inWarranty","addDate" 
  FROM "Works"`;
});

app.get("/getWorksListNotAssigned", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","mail_date","service_date","status","userID","customerID","address","province","inWarranty","addDate" 
    FROM "Works" WHERE "userID" IS NULL;`;
});

app.post(
  "/editWork",
  async ({ body }: { body: Work }) => {
    try {
      const { id, mail_date, service_date, customerID, address, province } =
        body;
      await db.$queryRaw`UPDATE "Works" SET "mail_date" = ${mail_date}, "service_date" = ${service_date},"customerID" = ${customerID},"address" = ${address},"province" = ${province}
    WHERE "id" = ${id}`;
      return "edit work";
    } catch (error: any) {
      return {
        error: "Error while editing work",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      id: t.Number(),
      mail_date: t.Date(),
      service_date: t.Date(),
      customerID: t.Number(),
      address: t.String(),
      province: t.String(),
      userID: t.String(),
    }),
  }
);

app.post(
  "/editResponsiblePerson",
  async ({ body }: { body: Work }) => {
    try {
      const { id, userID } = body;
      await db.$queryRaw`UPDATE "Works" SET "userID" = ${userID} WHERE "id" = ${id};`;
      return "edit user responsible person";
    } catch (error: any) {
      return {
        error: "Error while editing responsible person",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      id: t.Number(),
      userID: t.String(),
    }),
  }
);

app.post(
  "/setWorkStatus",
  async ({ body }: { body: Work }) => {
    try {
      const { id, status } = body;
      await db.$queryRaw`UPDATE "Works" SET"status" = ${status}
    WHERE "id" = ${id}`;
      return "edit work";
    } catch (error: any) {
      return {
        error: "Error while editing work",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      id: t.Number(),
      status: t.Number(),
    }),
  }
);

export default app;
