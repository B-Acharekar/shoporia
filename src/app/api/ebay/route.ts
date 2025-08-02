// /app/api/ebay/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import qs from "qs";

// Get Production eBay App Token
async function getEbayAppToken(): Promise<string> {
  const credentials = Buffer.from(
    `${process.env.EBAY_CLIENT_ID}:${process.env.EBAY_CLIENT_SECRET}`
  ).toString("base64");

  const { data } = await axios.post(
    "https://api.ebay.com/identity/v1/oauth2/token", // ✅ switched to production
    qs.stringify({
      grant_type: "client_credentials",
      scope: "https://api.ebay.com/oauth/api_scope", // ✅ production scope
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

// Unsplash fallback
async function fetchFallbackImage(productName: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        productName
      )}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`
    );

    if (!res.ok) return null;

    const data = await res.json();
    return data.results?.[0]?.urls?.small || null;
  } catch (error) {
    console.error("Unsplash fallback failed:", error);
    return null;
  }
}

// GET handler
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "laptop";
  const page = Number(searchParams.get("page") || 1);
  const perPage = Number(searchParams.get("perPage") || 20);
  const offset = (page - 1) * perPage;

  try {
    const token = await getEbayAppToken();

    // ✅ Production endpoint
    const response = await axios.get(
      "https://api.ebay.com/buy/browse/v1/item_summary/search",
      {
        params: { q: query, limit: perPage, offset },
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const itemsWithFallback = await Promise.all(
      (response.data.itemSummaries || []).map(async (item: any) => {
        let imageUrl =
          item.image?.imageUrl ||
          item.additionalImages?.[0]?.imageUrl ||
          null;

        if (!imageUrl) {
          const fallback = await fetchFallbackImage(item.title);
          imageUrl = fallback || "/no-image.png";
        }

        return { ...item, resolvedImage: imageUrl };
      })
    );

    const total = response.data.total || 0;
    return NextResponse.json({
      items: itemsWithFallback,
      total,
      perPage,
      page,
      totalPages: Math.ceil(total / perPage),
    });
  } catch (error) {
    console.error("eBay API failed:", error);
    return NextResponse.json({ error: "eBay API failed" }, { status: 500 });
  }
}
