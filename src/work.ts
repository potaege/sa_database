import { Elysia } from "elysia";

import db from "./db";

const app = new Elysia({ prefix: "/works" });

interface Work {
  id: string;
  mail_date: Date;
  service_date: Date;
  status: number;
  userID: string;
  customerID: number;
  address: string;
  province: string;
  inWarranty: boolean;
}

app.post("/createNewWork", async ({ body }: { body: Work }) => {
  try {
    const {
      mail_date,
      service_date,
      status,
      userID,
      customerID,
      address,
      province,
      inWarranty,
    } = body;

    await db.$queryRaw`INSERT INTO "Works" 
    ("mail_date","service_date","status","userID","customerID","address","province","inWarranty")
    VALUES (${mail_date},${service_date},${status},${userID},${customerID},${address},${province},${inWarranty});`;
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

app.get("/getWorksList", async () => {
  return await db.$queryRaw`SELECT "id","mail_date","service_date","status","userID","customerID","address","province","inWarranty","addDate" 
  FROM "Works"`;
});

app.post("/editWork", async ({ body }: { body: Work }) => {
  try {
    const {
      mail_date,
      service_date,
      status,
      userID,
      customerID,
      address,
      province,
      inWarranty,
    } = body;
    await db.$queryRaw`UPDATE "Works" SET "mail_date" = ${mail_date}, "service_date" = ${service_date},"status" = ${status},"userID" = ${userID},"customerID" = ${customerID},"address" = ${address},"province" = ${province}, "inWarranty" = ${inWarranty}`;
    return "edit work";
  } catch (error: any) {
    return {
      error: "Error while editing work",
      details: error.message,
    };
  }
});

export default app;
