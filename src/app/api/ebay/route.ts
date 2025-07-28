import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "laptop";

  try {
    const response = await axios.get(
      "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search",
      {
        params: { q: query, limit: 3 },
        headers: {
          Authorization: `Bearer ${process.env.EBAY_OAUTH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data, { status: 200 });
  } catch (err: unknown) {
    const error = err as AxiosError<{ errors?: any }>;
    console.error("eBay API error:", error.response?.data || error.message);

    return NextResponse.json(
      { error: error.response?.data || error.message },
      { status: error.response?.status || 500 }
    );
  }
}
