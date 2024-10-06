import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/user" });

interface User {
  id: string;
  username: string;
  password: string;
  name: string;
  surname: string;
  address: string;
  province: string;
  role: string;
}

app.get("/searchbyID/:id", async (id) => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","role" FROM "Users" WHERE "id" like ${id};`;
});

app.get("/getUserList", async () => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","role" FROM "Users";`;
});

app.get("/getUserListWithFilterRole/:role", async (role) => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","role" FROM "Users" WHERE "role" like ${role};`;
});

app.get("/login/:username/:password", async ({ params }) => {
  return await db.$queryRaw`SELECT "id" FROM "Users" WHERE "username" like ${params.username} AND "password" like ${params.password};`;
});

app.get("/getUserListWithFilterProvince", async (province) => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","rold" FROM "Users" WHERE "province" like ${province}`;
});

app.post("/addNewUser", async ({ body }: { body: User }) => {
  try {
    const { username, password, name, surname, address, province, role } = body;

    await db.$queryRaw`INSERT INTO "Users" ("username","password","name","surname","address","province","role") VALUES (${username},${password},${name},${surname},${address},${province},${role})`;

    return "add new users";
  } catch (error: any) {
    return {
      error: "Error while creating user",
      details: error.message,
    };
  }
});

app.post("/editUser", async ({ body }: { body: User }) => {
  try {
    const { id, username, password, name, surname, address, province, role } =
      body;

    await db.$queryRaw`UPDATE "Users" SET "username" = ${username}, "password" = ${password},"name" = ${name},"surname" = ${surname},"address" = ${address},"province" = ${province},"role" = ${role}`;

    return "editing users data";
  } catch (error: any) {
    return {
      error: "Error while editing user data",
      details: error.message,
    };
  }
});

//TODO List

export default app;
