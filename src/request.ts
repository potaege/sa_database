import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/request" });

interface Request {
  id: number;
  model: string;
  sn: string;
  rated: string;
  description: string;
  warranty: Boolean;
  workID: string;
  addedDate: Date;
}

app.post("/insertRequest", async ({ body }: { body: Request }) => {
  try {
    const { id, model, sn, rated, description, warranty, workID } = body;

    await db.$queryRaw`INSERT INTO "Requests"
    ("model","sn","rated","description","warranty","workID")
    VALUES (${model},${sn},${rated},${description},${warranty},${workID});`;
  } catch (error: any) {
    return {
      error: "error while create request",
      details: error.message,
    };
  }
});

app.get("/getByID:/id", async (id) => {
  return await db.$queryRaw`SELECT "id","model","sn","rated","description","warranty","workID","addedDate"
  FROM "request" WHERE "id" like ${id}`;
});

app.get("/getList", async () => {
  return await db.$queryRaw`SELECT "id","model","sn","rated","description","warranty","workID","addedDate"
  FROM "request"`;
});

// TODO List
export default app;
