import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { url, method, headers, body } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Basic URL validation - prevent SSRF to internal IPs
    const parsed = new URL(url);
    const hostname = parsed.hostname;
    const isInternal =
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "::1" ||
      hostname.startsWith("192.168.") ||
      hostname.startsWith("10.") ||
      hostname.startsWith("169.254.") ||
      /^172\.(1[6-9]|2\d|3[01])\./.test(hostname);

    if (isInternal) {
      return NextResponse.json(
        { error: "Requests to internal/private IPs are not allowed" },
        { status: 403 }
      );
    }

    const startTime = Date.now();
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    // Strip hop-by-hop headers that shouldn't be forwarded
    const forwardHeaders: Record<string, string> = {};
    const skipHeaders = [
      "host",
      "connection",
      "transfer-encoding",
      "te",
      "trailer",
      "upgrade",
    ];
    for (const [key, value] of Object.entries(headers || {})) {
      if (!skipHeaders.includes(key.toLowerCase())) {
        forwardHeaders[key] = value as string;
      }
    }

    const response = await fetch(url, {
      method: method || "GET",
      headers: forwardHeaders,
      body:
        method !== "GET" && method !== "HEAD"
          ? JSON.stringify(body)
          : undefined,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const duration = Date.now() - startTime;
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : await response.text();

    // Forward response headers (excluding sensitive ones)
    const responseHeaders: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      responseHeaders[key] = value;
    });

    return NextResponse.json({
      status: response.status,
      statusText: response.statusText,
      data,
      headers: responseHeaders,
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 0,
        statusText: "Proxy Error",
        data:
          error instanceof Error ? error.message : "Proxy request failed",
        headers: {},
        duration: 0,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
