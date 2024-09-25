import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const app = new Elysia();

app.post("/sign-up", async ({ body }) =>
  db.user.create({
    data: body,
  })
);

app.get("/", async () => {
  return await db.$queryRaw`SELECT * FROM "User";`;
});

app.get("/insert/:username/:password", async ({ params }) => {
  if (params.password.length < 8){
    return "password too short (8 minimum)"
  }

  try {
    const data = await db.$queryRaw`INSERT INTO "User" ("username","password") 
  VALUES (${params.username},${params.password})
  RETURNING *;
  `;
    return data;
  } catch (error : any) {
    console.log(error);
    if (error.code == "P2010"){
      return "duplicate username code : " + error.code;
    }
    return error.code;
  }
});

app.get("/login/:username/:password", async ({params}) => {
  
// console.log(typeof params.username)
// const data = await db.$queryRaw`SELECT * FROM "User" WHERE "username" = ${params.username} AND "password" = ${params.password};`;
// if (data.length == 0){
//   return "Wrong password"
// }
// return data
}); 

app.get("/edit", async ({params}) => {
  return "constructing...."
})

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
