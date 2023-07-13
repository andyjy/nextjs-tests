import type { NextApiRequest, NextApiResponse } from "next";

import {
  testStore,
  testPromise,
  testThenable,
} from "../../lib/async-local-storage";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json({
    status: "ok",
    runtime: "node",
    store: await testStore(),
    promise: await testPromise(),
    thenable: await testThenable(),
  });
}
