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
  addDate: Date;
}

app.get("/getFromUserID/:userID", (user_id) => {
  return db.$queryRaw`SELECT "id","spare_part_id","quantity","user_id","addDate"
    FROM Spare_parts_engineers 
    WHERE user_id = ${user_id}`;
});

app.post(
  "/insertSparePartsEngineer",
  async ({ body }: { body: SparePartEngineerTable }) => {
    try {
      const { spare_part_id, quantity, user_id } = body;
      await db.$queryRaw`INSERT INTO Spare_parts_engineers ("spare_part_id", "quantity", "user_id") VALUES (${spare_part_id}, ${quantity}, ${user_id})`;
    } catch (error: any) {
      return {
        error: "Error while creating spare parts engineer",
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
      addDate: t.Date(),
    }),
  }
);

app.post(
  "/editSparePartsEngineer",
  async ({ body }: { body: SparePartEngineerTable }) => {
    try {
      const { id, spare_part_id, quantity, user_id } = body;

      await db.$queryRaw`UPDATE Spare_parts_engineers SET "spare_part_id" = ${spare_part_id}, "quantity" = ${quantity}, "user_id" = ${user_id} WHERE "id" = ${id}`;
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
      addDate: t.Date(),
    }),
  }
);
// TODO List

export default app;
