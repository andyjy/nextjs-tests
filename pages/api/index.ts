import type { NextApiRequest, NextApiResponse } from "next";

import {
  testStore,
  testPromise,
  testThenable,
  testThenableNoAsync,
  testAsyncResource,
  testFnWithThenable,
  testWrappedFnWithThenable,
} from "../../lib/async-local-storage";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.send(
    JSON.stringify(
      {
        status: "ok",
        runtime: "node",
        store: await testStore(),
        promise: await testPromise(),
        thenable: await testThenable(),
        thenable_no_async: await testThenableNoAsync(),
        async_resource: await testAsyncResource(),
        fn_with_thenable: await testFnWithThenable(),
        wrapped_fn_with_thenable: await testWrappedFnWithThenable(),
      },
      undefined,
      2
    )
  );
}
