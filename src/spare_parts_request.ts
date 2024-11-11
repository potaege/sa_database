import { Elysia, t } from "elysia";
import db from "./db";

interface Spare_parts_requests {
  id: number;
  request_id: number;
  spare_part_id: number;
  spare_parts_qty: number;
  description: string;
  sn: string;
  add_date: Date;
}

const app = new Elysia({
  prefix: "/Spare_parts_requests",
  detail: { tags: ["Spare Parts Request"] },
});

app.get("/getListInRequest/:request_id", async ({ params }) => {
  return await db.$queryRaw`
    SELECT 
      "Spare_parts_requests"."id", 
      "Spare_parts_requests"."request_id",
      "Spare_parts_requests"."spare_part_id", 
      "Spare_parts_requests"."spare_parts_qty",
      "Spare_parts"."price", 
      "Spare_parts"."name",
      "Spare_parts"."unit",
      "Spare_parts_requests"."description", 
      "Spare_parts_requests"."add_date"
    FROM "Spare_parts_requests"
    JOIN "Spare_parts" ON "Spare_parts_requests"."spare_part_id" = "Spare_parts"."id"
    WHERE "Spare_parts_requests"."request_id" = ${parseInt(params.request_id)}
  `;
});

app.get("/getById/:id", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","request_id", "spare_part_id", "spare_parts_qty","description","add_date","sn" FROM "Spare_parts_requests" WHERE id = ${parseInt(
    params.id
  )}`;
});

app.post(
  "/insertNewSparePartsRequest",
  async ({ body }: { body: Spare_parts_requests }) => {
    try {
      const { request_id, spare_part_id, spare_parts_qty, description, sn } =
        body;

      await db.$queryRaw`INSERT INTO "Spare_parts_requests" ("request_id", "spare_part_id", "spare_parts_qty","description","sn")
      VALUES (${request_id}, ${spare_part_id}, ${spare_parts_qty},  ${description}, ${sn})`;

      return "add new Spare_parts request";
    } catch (error: any) {
      return {
        error: "Error while creating spare parts request",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      request_id: t.Number(),
      spare_part_id: t.Number(),
      spare_parts_qty: t.Number(),
      description: t.String(),
      sn: t.String(),
    }),
  }
);

app.post(
  "/editSparePartsRequest",
  async ({ body }: { body: Spare_parts_requests }) => {
    try {
      const { spare_part_id, spare_parts_qty, description, sn } = body;

      await db.$queryRaw`UPDATE "Spare_parts_requests" SET "spare_part_id" = ${spare_part_id},"spare_parts_qty" = ${spare_parts_qty}, "description" = ${description}, "sn" = ${sn}`;

      return "edit Spare_parts request";
    } catch (error: any) {
      return {
        error: "Error while edit spare parts request",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      id: t.Number(),
      spare_part_id: t.Number(),
      spare_parts_qty: t.Number(),
      description: t.String(),
      sn: t.String(),
    }),
  }
);

app.post(
  "/deleteSparePartsRequest",
  async ({ body }: { body: Spare_parts_requests }) => {
    try {
      const { id } = body;

      await db.$queryRaw`DELETE FROM "Spare_parts_requests" WHERE "id" = ${id}`;
      return "delete Spare_parts request";
    } catch (error: any) {
      return {
        error: "Error while delete spare parts request",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      id: t.Number(),
    }),
  }
);

export default app;
