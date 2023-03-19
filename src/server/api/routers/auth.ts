import { randomUUID } from "crypto";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const authRouter = createTRPCRouter({
  randomId: publicProcedure.query(() => {
    return randomUUID();
  }),
});
