import type { NextApiRequest, NextApiResponse } from "next";

import {
  testStore,
  testPromise,
  testThenable,
  testThenableNoAsync,
  testAsyncResource,
} from "../../lib/async-local-storage";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    status: "ok",
    runtime: "node",
    store: await testStore(),
    promise: await testPromise(),
    thenable: await testThenable(),
    thenable_no_async: await testThenableNoAsync(),
    async_resource: await testAsyncResource(),
  });
}
