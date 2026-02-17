"use client";

import { useState, useEffect } from "react";
import { Send, Plus, Trash2, Play } from "lucide-react";
import { ApiRequest, ApiSpec } from "@/types";

interface RequestBuilderProps {
  onRequest: (request: ApiRequest) => void;
  apiSpec: ApiSpec | null;
  isLoading: boolean;
}

const METHODS = ["GET", "POST", "PUT", "DELETE", "PATCH"] as const;
const METHOD_COLORS: Record<string, string> = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  PATCH: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export function RequestBuilder({ onRequest, apiSpec, isLoading }: RequestBuilderProps) {
  const [method, setMethod] = useState<"GET" | "POST" | "PUT" | "DELETE" | "PATCH">("GET");
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Record<string, string>>({});
  const [body, setBody] = useState<any>({});
  const [queryParams, setQueryParams] = useState<Record<string, string>>({});

  // Pre-fill with example if API spec is available
  useEffect(() => {
    if (apiSpec?.paths) {
      const firstPath = Object.keys(apiSpec.paths)[0];
      const firstMethod = Object.keys(apiSpec.paths[firstPath])[0];
      if (firstPath) {
        setUrl(`https://api.example.com${firstPath}`);
        setMethod(firstMethod.toUpperCase() as any);
      }
    }
  }, [apiSpec]);

  const addHeader = () => {
    const key = `header-${Date.now()}`;
    setHeaders({ ...headers, [key]: "" });
  };

  const removeHeader = (key: string) => {
    const newHeaders = { ...headers };
    delete newHeaders[key];
    setHeaders(newHeaders);
  };

  const updateHeader = (key: string, value: string) => {
    setHeaders({ ...headers, [key]: value });
  };

  const addQueryParam = () => {
    const key = `param-${Date.now()}`;
    setQueryParams({ ...queryParams, [key]: "" });
  };

  const removeQueryParam = (key: string) => {
    const newParams = { ...queryParams };
    delete newParams[key];
    setQueryParams(newParams);
  };

  const updateQueryParam = (key: string, value: string) => {
    setQueryParams({ ...queryParams, [key]: value });
  };

  const handleSend = () => {
    if (!url) return;

    // Build full URL with query params
    let fullUrl = url;
    const validParams = Object.entries(queryParams)
      .filter(([_, value]) => value.trim() !== "")
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    if (validParams.length > 0) {
      fullUrl += (url.includes("?") ? "&" : "?") + validParams.join("&");
    }

    const request: ApiRequest = {
      id: Date.now().toString(),
      method,
      url: fullUrl,
      headers: Object.fromEntries(
        Object.entries(headers).filter(([key, value]) => key.trim() !== "" && value.trim() !== "")
      ),
      body: method !== "GET" ? body : undefined,
      queryParams: Object.fromEntries(
        Object.entries(queryParams).filter(([key, value]) => key.trim() !== "" && value.trim() !== "")
      ),
      timestamp: new Date().toISOString(),
    };

    onRequest(request);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <Play className="w-6 h-6" />
        Request Builder
      </h2>

      {/* Method and URL */}
      <div className="mb-6 flex gap-4">
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value as any)}
          className={`px-4 py-3 rounded-lg font-semibold text-sm ${METHOD_COLORS[method]} border-none cursor-pointer`}
        >
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://api.example.com/endpoint"
          className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Query Parameters */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Query Parameters</h3>
          <button
            onClick={addQueryParam}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Plus className="w-4 h-4" />
            Add Parameter
          </button>
        </div>
        <div className="space-y-2">
          {Object.entries(queryParams).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newParams = { ...queryParams };
                  delete newParams[key];
                  newParams[e.target.value] = value;
                  setQueryParams(newParams);
                }}
                placeholder="Parameter name"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => updateQueryParam(key, e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
              />
              <button
                onClick={() => removeQueryParam(key)}
                className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Headers */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Headers</h3>
          <button
            onClick={addHeader}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            <Plus className="w-4 h-4" />
            Add Header
          </button>
        </div>
        <div className="space-y-2">
          {Object.entries(headers).map(([key, value]) => (
            <div key={key} className="flex gap-2">
              <input
                type="text"
                value={key}
                onChange={(e) => {
                  const newHeaders = { ...headers };
                  delete newHeaders[key];
                  newHeaders[e.target.value] = value;
                  setHeaders(newHeaders);
                }}
                placeholder="Header name"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
              />
              <input
                type="text"
                value={value}
                onChange={(e) => updateHeader(key, e.target.value)}
                placeholder="Value"
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm"
              />
              <button
                onClick={() => removeHeader(key)}
                className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Body (for non-GET requests) */}
      {method !== "GET" && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Request Body (JSON)</h3>
          <textarea
            value={JSON.stringify(body, null, 2)}
            onChange={(e) => {
              try {
                setBody(JSON.parse(e.target.value));
              } catch (err) {
                // Allow invalid JSON while typing
                setBody(e.target.value);
              }
            }}
            placeholder='{\n  "key": "value"\n}'
            className="w-full h-32 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-mono text-sm resize-none"
          />
        </div>
      )}

      {/* Send Button */}
      <button
        onClick={handleSend}
        disabled={!url || isLoading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Request
          </>
        )}
      </button>
    </div>
  );
}
