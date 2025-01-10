import { initTRPC } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.create();
export const router = t.router;

let users = [
  { id: 1, name: 'User A', age: 30 },
  { id: 2, name: 'User B', age: 25 },
  { id: 3, name: 'User C', age: 19 },
  { id: 4, name: 'User D', age: 25 },


];

export const appRouter = router({
  // A simple query to say hello

  greeting: t.procedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name} 👋🏻` };
    }),



  // Query to fetch a list of users
  getUsers: t.procedure.query(() => {
    return users;
  }),

  
});

export type AppRouter = typeof appRouter;
