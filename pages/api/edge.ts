import type { NextRequest } from "next/server";

import {
  testStore,
  testPromise,
  testThenable,
  testThenableNoAsync,
  testAsyncResource,
  testFnWithThenable,
  testWrappedFnWithThenable,
} from "../../lib/async-local-storage";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify(
      {
        status: "ok",
        runtime: "edge",
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
    ),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
