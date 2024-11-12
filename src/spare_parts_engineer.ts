import { Elysia, t } from "elysia";
import db from "./db";

const app = new Elysia({
  prefix: "/spare_parts_engineer",
  detail: { tags: ["Spare Parts Engineers"] },
});

interface SparePartEngineerTable {
  id: number;
  spare_part_id: number;
  quantity: number;
  user_id: number;
  add_date: Date;
}
app.get("/getFromUserID/:userID", async ({ params }) => {
  return await db.$queryRaw`SELECT Spare_parts.id,Spare_parts_engineers.id,Spare_parts.name,Spare_parts_engineers.quantity,Spare_parts_engineers.user_id,Spare_parts_engineers."add_date"
    FROM "Spare_parts_engineers" AS Spare_parts_engineers
    JOIN "Spare_parts" AS Spare_parts ON Spare_parts.id = Spare_parts_engineers.spare_part_id
    WHERE Spare_parts_engineers."user_id" = ${parseInt(params.userID)}`;
});

app.post(
  "/insertSparePartsEngineer",
  async ({ body }: { body: SparePartEngineerTable }) => {
    try {
      const { spare_part_id, quantity, user_id } = body;
      await db.$queryRaw`INSERT INTO "Spare_parts_engineers" ("spare_part_id", "quantity", "user_id") VALUES (${spare_part_id}, ${quantity}, ${user_id})`;
    } catch (error: any) {
      return {
        error: "Error while creating spare parts engineer",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      spare_part_id: t.Number(),
      quantity: t.Number(),
      user_id: t.Number(),
    }),
  }
);

app.post(
  "/editSparePartsEngineer",
  async ({ body }: { body: SparePartEngineerTable }) => {
    try {
      const { id, spare_part_id, quantity, user_id } = body;

      await db.$queryRaw`UPDATE "Spare_parts_engineers" SET "spare_part_id" = ${spare_part_id}, "quantity" = ${quantity}, "user_id" = ${user_id} WHERE "id" = ${id}`;
    } catch (error: any) {
      return {
        error: "Error while editing spare parts engineer",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      id: t.Number(),
      spare_part_id: t.Number(),
      quantity: t.Number(),
      user_id: t.Number(),
    }),
  }
);
// TODO List

export default app;
