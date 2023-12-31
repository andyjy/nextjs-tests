import type { NextApiRequest, NextApiResponse } from "next";

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
      },
      undefined,
      2
    )
  );
}
