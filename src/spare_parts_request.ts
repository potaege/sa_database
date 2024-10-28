import { Elysia } from "elysia";
import db from "./db";

interface Spare_parts_request {
  id: number;
  request_id: number;
  spare_part_id: number;
  spare_part_qty: number;
  price: number;
  description: string;
  sn: string;
  add_date: Date;
}

const app = new Elysia({ prefix: "/spare_parts_request" });

app.get("/getListInRequest:/requestid", async (request_id) => {
  return await db.$queryRaw`SELECT Spare_parts_request.id, Spare_parts_request.request_id,Spare_parts_request.name, Spare_parts_request.spare_part_qty,Spare_parts_request.price,Spare_parts_request.description, Spare_parts_request.addDate
  FROM Spare_parts_request
  JOIN Spare_parts ON Spare_parts_request.spare_part_id = Spare_parts.id
  WHERE Spare_parts_request.request_id IN (SELECT request_id FROM Requests WHERE request_id = ${request_id})`;
});

app.post(
  "/insertNewSparePartsRequest",
  async ({ body }: { body: Spare_parts_request }) => {
    try {
      const {
        request_id,
        spare_part_id,
        spare_part_qty,
        price,
        description,
        sn,
      } = body;

      await db.$queryRaw`INSERT INTO Spare_parts_request ("request_id", "spare_part_id", "spare_part_qty","price","description","sn")
      VALUES (${request_id}, ${spare_part_id}, ${spare_part_qty}, ${price}, ${description}, ${sn})`;

      return "add new Spare_parts request";
    } catch (error: any) {
      return {
        error: "Error while creating spare parts request",
        details: error.message,
      };
    }
  }
);

app.post(
  "/editSparePartsRequest",
  async ({ body }: { body: Spare_parts_request }) => {
    try {
      const { spare_part_id, spare_part_qty, price, description, sn } = body;

      await db.$queryRaw`UPDATE Spare_parts_request SET "spare_part_id" = ${spare_part_id},"spare_part_qty" = ${spare_part_qty},"price" = ${price}, "description" = ${description}, "sn" = ${sn}`;

      return "edit Spare_parts request";
    } catch (error: any) {
      return {
        error: "Error while edit spare parts request",
        details: error.message,
      };
    }
  }
);

app.post(
  "/deleteSparePartsRequest",
  async ({ body }: { body: Spare_parts_request }) => {
    try {
      const { id } = body;

      await db.$queryRaw`DELETE FROM "Spare_parts_request" WHERE "id" = ${id}`;
      return "delete Spare_parts request";
    } catch (error: any) {
      return {
        error: "Error while delete spare parts request",
        details: error.message,
      };
    }
  }
);

export default app;
