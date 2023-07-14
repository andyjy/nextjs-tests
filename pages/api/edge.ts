import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default async function handler(req: NextRequest) {
  return new Response(
    JSON.stringify(
      {
        status: "ok",
        runtime: "edge",
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
