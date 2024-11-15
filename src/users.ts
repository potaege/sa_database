import { Elysia, t } from "elysia";
import crypto from "crypto";
import db from "./db";

const app = new Elysia({ prefix: "/user", detail: { tags: ["Users"] } });

interface User {
  id: number;
  username: string;
  password: string;
  salt: string;
  name: string;
  surname: string;
  address: string;
  province: string;
  role: string;
  add_date: Date;
}

const generateSalt = (length: number = 16): string => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

const encryptWithSalt = (data: string, salt: string): string => {
  const hashed = crypto
    .createHash("sha256")
    .update(data + salt)
    .digest("hex");
  return hashed;
};

app.get("/searchbyID/:id", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","username","password","name","surname","address","province","role","add_date" FROM "Users" WHERE "id" = ${parseInt(
    params.id
  )};`;
});

app.get("/getUserList", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","role","add_date" FROM "Users";`;
});

app.get("/getUserListWithFilterRole/:role", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","role","add_date" FROM "Users" WHERE "role" = ${params.role};`;
});

app.get("/getUserListWithNameAndSurname/:name/:surname", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","role","add_date" FROM "Users" WHERE "name" = ${params.name} AND "surname" = ${params.surname};`;
});

app.post(
  "/login/",
  async ({ body }: { body: User }) => {
    try {
      const { username, password, salt } = body;

      const authen: User[] =
        await db.$queryRaw`SELECT "username", "password", "salt" FROM "Users" WHERE "username" = ${username};`;

      const hashedInput = encryptWithSalt(password, authen[0].salt);

      if (authen[0].password === hashedInput) {
        const user: User[] =
          await db.$queryRaw`SELECT "id","username","name","surname","address","province","role","add_date" FROM "Users" where "username" = ${username}`;
        return {
          payload: user[0].id,
          error: "",
          details: "",
        };
      } else {
        return {
          payload: "",
          error: "authentication failed",
          details: "Wrong password",
        };
      }
    } catch (error: any) {
      return {
        payload: "",
        error: "Error while login",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    }),
  }
);
app.get("/getUserListWithFilterProvince/:province", async ({ params }) => {
  return await db.$queryRaw`SELECT "id","username","name","surname","address","province","rold","add_date" 
  FROM "Users" 
  WHERE "province" 
  like ${params.province}`;
});

app.post(
  "/addNewUser",
  async ({ body }: { body: User }) => {
    try {
      const { username, password, name, surname, address, province } = body;
      const salt = generateSalt();
      const hashed = encryptWithSalt(password, salt);
      await db.$queryRaw`INSERT INTO "Users" ("username","password","salt","name","surname","address","province","role") VALUES (${username},${hashed},${salt},${name},${surname},${address},${province},'user')`;

      return "add new users";
    } catch (error: any) {
      return {
        error: "Error while creating user",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      username: t.String(),
      password: t.String(),
      name: t.String(),
      surname: t.String(),
      address: t.String(),
      province: t.String(),
    }),
  }
);

app.post(
  "/editUser",
  async ({ body }: { body: User }) => {
    try {
      const { id, username, password, name, surname, address, province, role } =
        body;
      const salt = generateSalt();
      const hashed = encryptWithSalt(password, salt);
      await db.$queryRaw`UPDATE "Users" SET "username" = ${username}, "password" = ${password},"name" = ${name},"surname" = ${surname},"address" = ${address},"province" = ${province},"role" = ${role}
    WHERE "id" = ${id}`;

      return "editing users data";
    } catch (error: any) {
      return {
        error: "Error while editing user data",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      id: t.Number(),
      username: t.String(),
      password: t.String(),
      name: t.String(),
      surname: t.String(),
      address: t.String(),
      province: t.String(),
      role: t.String(),
    }),
  }
);

app.post(
  "/addNewAdmin",
  async ({ body }: { body: User }) => {
    try {
      const { username, password, name, surname, address, province } = body;
      const salt = generateSalt();
      const hashed = encryptWithSalt(password, salt);
      await db.$queryRaw`INSERT INTO "Users" ("username","password","salt","name","surname","address","province","role") VALUES (${username},${hashed},${salt},${name},${surname},${address},${province},'admin')`;

      return "add new users";
    } catch (error: any) {
      return {
        error: "Error while creating user",
        details: error.message,
      };
    }
  },
  {
    body: t.Object({
      username: t.String(),
      password: t.String(),
      name: t.String(),
      surname: t.String(),
      address: t.String(),
      province: t.String(),
    }),
  }
);

//TODO List

export default app;
