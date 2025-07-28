import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import qs from "qs";

async function getEbayAppToken(): Promise<string> {
  try {
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
  } catch (err) {
    const error = err as AxiosError;
    console.error("Token fetch failed:", error.response?.data || error.message);
    throw new Error("eBay token request failed");
  }
}


export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "laptop";

  try {
    const token = await getEbayAppToken();

    const response = await axios.get(
      "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search",
      {
        params: { q: query, limit: 3 },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (err) {
    const error = err as AxiosError<{ errors?: any }>;
    console.error("eBay API error:", error.response?.data || error.message);

    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
