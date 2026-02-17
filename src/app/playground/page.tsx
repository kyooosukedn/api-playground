"use client";

import { useState, useEffect } from "react";
import { RequestBuilder } from "@/components/request-builder";
import { ResponseViewer } from "@/components/response-viewer";
import { StatusBar } from "@/components/status-bar";
import { RequestHistory } from "@/components/request-history";
import { ApiRequest, ApiResponse } from "@/types";

export default function PlaygroundPage() {
  const [apiSpec, setApiSpec] = useState<any>(null);
  const [currentRequest, setCurrentRequest] = useState<ApiRequest | null>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<ApiRequest[]>([]);

  // Load API spec and replay request from localStorage on mount
  useEffect(() => {
    const savedSpec = localStorage.getItem("api-spec");
    if (savedSpec) {
      try {
        setApiSpec(JSON.parse(savedSpec));
      } catch (e) {
        console.error("Failed to load API spec:", e);
      }
    }

    // Check for replay request
    const replayRequest = localStorage.getItem("replay-request");
    if (replayRequest) {
      try {
        const request = JSON.parse(replayRequest);
        setCurrentRequest(request);
        // Clear it after loading
        localStorage.removeItem("replay-request");
      } catch (e) {
        console.error("Failed to load replay request:", e);
      }
    }

    // Load request history from localStorage
    const savedHistory = localStorage.getItem("request-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load request history:", e);
      }
    }
  }, []);

  const handleSendRequest = async (request: ApiRequest) => {
    setIsLoading(true);
    setResponse(null);
    setCurrentRequest(request);

    try {
      const startTime = Date.now();
      const res = await fetch(request.url, {
        method: request.method,
        headers: request.headers,
        body: request.method !== "GET" ? JSON.stringify(request.body) : undefined,
      });
      const duration = Date.now() - startTime;
      const contentType = res.headers.get("content-type") || "";
      const isJson = contentType.includes("application/json");

      let responseData: any;
      if (isJson) {
        responseData = await res.json();
      } else {
        responseData = await res.text();
      }

      const apiResponse: ApiResponse = {
        status: res.status,
        statusText: res.statusText,
        data: responseData,
        headers: Object.fromEntries(res.headers.entries()),
        duration,
        timestamp: new Date().toISOString(),
      };

      setResponse(apiResponse);

      // Add to history
      const newHistory = [request, ...history].slice(0, 50); // Keep last 50
      setHistory(newHistory);
      localStorage.setItem("request-history", JSON.stringify(newHistory));
    } catch (error) {
      setResponse({
        status: 0,
        statusText: "Network Error",
        data: error instanceof Error ? error.message : "Failed to make request",
        headers: {},
        duration: 0,
        timestamp: new Date().toISOString(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReplayRequest = (request: ApiRequest) => {
    handleSendRequest(request);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StatusBar isLoading={isLoading} response={response} />

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <RequestBuilder
              onRequest={handleSendRequest}
              apiSpec={apiSpec}
              isLoading={isLoading}
            />

            {response && (
              <div className="mt-6">
                <ResponseViewer response={response} />
              </div>
            )}
          </div>

          {/* History Sidebar */}
          <aside className="w-80 hidden lg:block">
            <RequestHistory
              history={history}
              onReplay={handleReplayRequest}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}
