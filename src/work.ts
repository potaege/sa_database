import { Elysia, t } from "elysia";
import { Prisma } from "@prisma/client";
import db from "./db";

const app = new Elysia({ prefix: "/works", detail: { tags: ["Work"] } });

interface Work {
  id: number;
  mail_date: Date;
  service_date: Date;
  status: number;
  customer_id: number;
  address: string;
  province: string;
  user_id: number;
  add_date: Date;
}

app.get("getLastWork", async () => {
  return await db.$queryRaw`SELECT "id","mail_date","service_date","status","user_id","customer_id","address","province","add_date" 
    FROM "Works" ORDER BY "id" DESC LIMIT 1`;
});

app.get("/searchByID/:id", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","mail_date","service_date","status","user_id","customer_id","address","province","add_date" 
  FROM "Works" WHERE "id" = ${parseInt(params.id)}`;
});

app.get("/getWorksList", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","mail_date","service_date","status","user_id","customer_id","address","province","add_date" 
  FROM "Works"`;
});

app.get("/getWorksListNotAssigned", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","mail_date","service_date","status","user_id","customer_id","address","province","add_date" 
    FROM "Works" WHERE "user_id" IS NULL;`;
});

app.get("/getWorksListByStatus/:status", async ({ params }) => {
  const statusList: number[] = params.status
    ? params.status.split(",").map(Number)
    : [];
  return await db.$queryRaw`
    SELECT "id","mail_date","service_date","status","user_id","customer_id","address","province","add_date"
    FROM "Works"
    WHERE "status" IN (${Prisma.join(statusList)})`;
});

app.post(
  "/editWork",
  async ({ body }: { body: Work }) => {
    try {
      const { id, mail_date, service_date, customer_id, address, province } =
        body;
      await db.$queryRaw`UPDATE "Works" SET "mail_date" = ${mail_date}, "service_date" = ${service_date},"customer_id" = ${customer_id},"address" = ${address},"province" = ${province}
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
      customer_id: t.Number(),
      address: t.String(),
      province: t.String(),
      user_id: t.Number(),
    }),
  }
);

app.post(
  "/editResponsiblePerson",
  async ({ body }: { body: Work }) => {
    try {
      const { id, user_id } = body;
      await db.$queryRaw`UPDATE "Works" SET "user_id" = ${user_id} WHERE "id" = ${id};`;
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
      user_id: t.Number(),
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

app.post(
  "/createNewWork",
  async ({ body }: { body: Work }) => {
    try {
      const {
        mail_date,
        service_date,
        status = 0, // default value
        customer_id,
        address,
        province,
      } = body;

      const add_date = new Date(); // ใช้ค่า default เป็นวันที่ปัจจุบัน

      await db.$queryRaw`
        INSERT INTO "Works"
        ("mail_date", "service_date", "status", "customer_id", "address", "province")
        VALUES (${mail_date}, ${service_date}, ${status}, ${customer_id}, ${address}, ${province});
      `;

      return "Added new work";
    } catch (error: any) {
      return {
        error: "Error while creating work",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      mail_date: t.Date(),
      service_date: t.Optional(t.Date()),
      status: t.Optional(t.Number()),
      user_id: t.Optional(t.Number()),
      customer_id: t.Number(),
      address: t.String(),
      province: t.String(),
      add_date: t.Optional(t.Date()),
    }),
  }
);
export default app;
