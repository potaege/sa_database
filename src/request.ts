import { Elysia, t } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/Requests", detail: { tags: ["Requests"] } });

interface Request {
  id: number;
  model: string;
  sn: string;
  rated: string;
  description: string;
  warranty: Boolean;
  workID: string;
  add_date: Date;
}
app.post("/deleteRequest", async ({ body }: { body: Request }) => {
  try {
    const { id } = body;

    await db.$queryRaw`DELETE FROM "Requests" WHERE id = "${id}";`;
  } catch (error: any) {
    return {
      error: "error while delete Requests",
      details: error.message,
    };
  }
});
app.post(
  "/editRequest",
  async ({ body }: { body: Request }) => {
    try {
      const { id, model, sn, rated, description } = body;

      await db.$queryRaw`UPDATE "Requests" SET "model" = ${model}, "sn" = ${sn}, "rated" = ${rated}, "description" = ${description},  
      WHERE "id" = ${id}`;
    } catch (error: any) {
      return {
        error: "error while edit Requests",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      id: t.Number(),
      model: t.String(),
      sn: t.String(),
      rated: t.String(),
      description: t.String(),
      warranty: t.Boolean(),
      workID: t.String(),
      add_date: t.Date(),
    }),
  }
);
app.post(
  "/insertRequest",
  async ({ body }: { body: Request }) => {
    try {
      const { id, model, sn, rated, description, warranty, workID } = body;

      await db.$queryRaw`INSERT INTO "Requests"
    ("model","sn","rated","description","warranty","workID")
    VALUES (${model},${sn},${rated},${description},${warranty},${workID});`;
    } catch (error: any) {
      return {
        error: "error while create Requests",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      model: t.String(),
      sn: t.String(),
      rated: t.String(),
      description: t.String(),
      warranty: t.Boolean(),
      workID: t.String(),
      add_date: t.Date(),
    }),
  }
);

app.get("/getByID/:id", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","model","sn","rated","description","warranty","workID","add_date"
  FROM "Requests" WHERE "id" = ${parseInt(params.id)}`;
});

app.get("/getList", async () => {
  return await db.$queryRaw`SELECT "id","model","sn","rated","description","warranty","workID","add_date"
  FROM "Requests"`;
});

// TODO List
export default app;
