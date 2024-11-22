// server/api/tripusers.ts
import { doPreChecks } from "../../utils/precheck";
import prisma from "../../prisma/client.js";

export default defineEventHandler(async (event) => {
  await doPreChecks(event, "users.ts");
  try {
    if (event.node.req.method === "GET") {
      return await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
    }
  } catch (error) {
    console.error("Database operation error:", error);
    return { error: "An error occurred during the request." };
  }
});
