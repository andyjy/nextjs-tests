import type { NextRequest } from "next/server";

import {
  testStore,
  testPromise,
  testThenable,
} from "../../lib/async-local-storage";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify({
      status: "ok",
      runtime: "edge",
      store: await testStore(),
      promise: await testPromise(),
      thenable: await testThenable(),
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
