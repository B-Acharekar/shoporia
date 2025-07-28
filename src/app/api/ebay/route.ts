// /app/api/ebay/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import qs from "qs";

async function getEbayAppToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
  ).toString("base64");

  const { data } = await axios.post(
    "https://api.sandbox.ebay.com/identity/v1/oauth2/token",
    qs.stringify({
      grant_type: "client_credentials",
      scope: "https://api.ebay.com/oauth/api_scope",
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${credentials}`,
      },
    }
  );
  return data.access_token;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "laptop";
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("perPage") || 20);
  const offset = (page - 1) * perPage;

  try {
    const token = await getEbayAppToken();

    const response = await axios.get(
      "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search",
      {
        params: { q: query, limit: perPage, offset },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const total = response.data.total || 0;
    return NextResponse.json({
      items: response.data.itemSummaries || [],
      total,
      perPage,
      page,
      totalPages: Math.ceil(total / perPage),
    });
  } catch (error) {
    return NextResponse.json({ error: "eBay API failed" }, { status: 500 });
  }
}

