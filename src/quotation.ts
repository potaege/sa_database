import { Elysia, error } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/quotation" });

interface Quotation {
  id: string;
  date: Date;
  contact_person: string;
  delivery_to: string;
  delivery_on: Date;
  payment_term: string;
  workID: string;
  addDate: Date;
}

app.post("/insertNewQuotation", async ({ body }: { body: Quotation }) => {
  try {
    const {
      id,
      date,
      contact_person,
      delivery_to,
      delivery_on,
      payment_term,
      workID,
      addDate,
    } = body;

    await db.$queryRaw`INSERT INTO "Quotation"
    ("date","contact_person","delivery_to","delivery_on","payment_term","workID")
    VALUES (${date},${contact_person},${delivery_to},${delivery_on},${payment_term},${workID})`;
    return "add new quotation";
  } catch (error: any) {
    return {
      error: "Error while create quotation",
      detail: error.message,
    };
  }
});

// ทำ Request table ให้เสร็จก่อน
app.get("/getQuotationsList", async () => {
  return db.$queryRaw`SELECT `;
});

// TODO list

// get list ข้อมูล
// get ข้อมูลจาก id

export default app;
