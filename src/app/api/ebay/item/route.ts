import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";

async function getEbayAppToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
  ).toString("base64");

  const { data } = await axios.post(
    "https://api.ebay.com/identity/v1/oauth2/token",
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
  const itemId = searchParams.get("id");

  if (!itemId) {
    return NextResponse.json({ error: "Missing itemId" }, { status: 400 });
  }

  try {
    const token = await getEbayAppToken();

    const response = await axios.get(
      `https://api.ebay.com/buy/browse/v1/item/${itemId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const item = response.data;

    return NextResponse.json({
      ...item,
      resolvedImage:
        item.image?.imageUrl ||
        item.additionalImages?.[0]?.imageUrl ||
        "/no-image.png",
    });
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("eBay Item fetch failed:", error.response?.data || error.message);
    } else {
      console.error("eBay Item fetch failed:", error);
    }

    return NextResponse.json(
      { error: "eBay item fetch failed" },
      { status: 500 }
    );
  }
}
