import { NextRequest, NextResponse } from "next/server";

import { env } from "../../../../env.mjs";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const headers: Record<string, string> = {};

  req.headers.forEach((value: string, key: string) => {
    // don't pass the cookie because it doesn't get used downstream
    if (key === "cookie") return;

    headers[key] = value;
  });

  const res = await fetch(env.ALCHEMY_RPC_URL, {
    method: "POST",
    headers: {
      ...headers,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return NextResponse.json(await res.json().catch((e) => ({})), {
      status: res.status,
    });
  }

  return NextResponse.json(await res.json());
}
