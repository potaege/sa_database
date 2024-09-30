import { Elysia } from "elysia";
import db from "./db";
import { password } from "bun";

const app = new Elysia({ prefix: "/user" });

app.get("/searchbyID/:id", async (id) => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","role" FROM "Users" WHERE "id" like ${id};`;
});

app.get("/getUserList", async () => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","role" FROM "Users";`;
});

app.get("/getUserListWithFilterRole/:role", async (role) => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province" FROM "Users" WHERE "role" like ${role};`;
});

app.get("/login/:username/:password", async ({ params }) => {
  return await db.$queryRaw`SELECT "id" FROM "Users" WHERE "username" like ${params.username} AND "password" like ${params.password};`;
});

app.get("/getUserListWithFilterProvince", async () => {
  return;
});

//TODO List

// Insert user ใหม่
// แก้ไขข้อมูล user

// app.post("/addNewUser", async ({ body }) => {
//   db.users.create({
//     data: {
//       username: "test",
//     },
//   });
// });

// Example

// app.post("/sign-up", async ({ body }) =>
//   db.users.create({
//     data: body,
//   })
// );

// app.get("/", async () => {
//   return await db.$queryRaw`SELECT * FROM "User";`;
// });

// app.get("/insert/:username/:password", async ({ params }) => {
//   if (params.password.length < 8) {
//     return "password too short (8 minimum)";
//   }

//   try {
//     const data = await db.$queryRaw`INSERT INTO "User" ("username","password")
//     VALUES (${params.username},${params.password})
//     RETURNING *;
//     `;
//     return data;
//   } catch (error: any) {
//     console.log(error);
//     if (error.code == "P2010") {
//       return "duplicate username code : " + error.code;
//     }
//     return error.code;
//   }
// });

// app.get("/login/:username/:password", async ({ params }) => {
//   console.log(typeof params.username)
//   const data = await db.$queryRaw`SELECT * FROM "User" WHERE "username" = ${params.username} AND "password" = ${params.password};`;
//   if (data.length == 0){
//     return "Wrong password"
//   }
//   return data
// });

// app.get("/edit", async ({ params }) => {
//   return "constructing....";
// });

export default app;
