import express from 'express';
import * as trpcExpress from '@trpc/server/adapters/express';
import { appRouter } from './server';

const app = express();

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(4000, () => {
  console.log('tRPC server running at http://localhost:4000/trpc');
});
