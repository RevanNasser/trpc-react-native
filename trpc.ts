import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';

import type { AppRouter } from './server'; 

export const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc', 
    }),
  ],
});
