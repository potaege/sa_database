import { Elysia } from "elysia";
import db from "./db";

const app = new Elysia({ prefix: "/spare_parts_request" });

export default app;
