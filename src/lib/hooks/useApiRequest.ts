"use client";

import { useState } from "react";
import { ApiRequest, ApiResponse } from "@/types";
import { storage } from "@/lib/storage";

const MAX_HISTORY_SIZE = 50;

export function useApiRequest() {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const sendRequest = async (request: ApiRequest, saveToHistory = true) => {
    setIsLoading(true);
    setResponse(null);

    try {
      const startTime = Date.now();
      const res = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body:
          request.method !== "GET"
            ? JSON.stringify(request.body)
            : undefined,
      });
      const duration = Date.now() - startTime;
      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");
      const data = isJson ? await res.json() : await res.text();

      const apiResponse: ApiResponse = {
        status: res.status,
        statusText: res.statusText,
        data,
        headers: Object.fromEntries(res.headers.entries()),
        duration,
        timestamp: new Date().toISOString(),
      };

      setResponse(apiResponse);

      if (saveToHistory) {
        const newHistory = [request, ...storage.getHistory()].slice(0, MAX_HISTORY_SIZE);
        storage.setHistory(newHistory);
      }

      return apiResponse;
    } catch (error) {
      const errorResponse: ApiResponse = {
        status: 0,
        statusText: "Network Error",
        data:
          error instanceof Error ? error.message : "Failed to make request",
        headers: {},
        duration: 0,
        timestamp: new Date().toISOString(),
      };
      setResponse(errorResponse);
      return errorResponse;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendRequest, response, isLoading };
}
