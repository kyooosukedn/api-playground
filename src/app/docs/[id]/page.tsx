"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { RequestBuilder } from "@/components/request-builder";
import { ResponseViewer } from "@/components/response-viewer";
import { StatusBar } from "@/components/status-bar";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import { ApiRequest, ApiResponse } from "@/types";

export default function DocsPage() {
  const params = useParams();
  const endpointId = params.id as string;
  const [apiSpec, setApiSpec] = useState<any>(null);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [endpointDoc, setEndpointDoc] = useState<any>(null);

  useEffect(() => {
    // Load API spec from localStorage
    const savedSpec = localStorage.getItem("api-spec");
    if (savedSpec) {
      try {
        const spec = JSON.parse(savedSpec);
        setApiSpec(spec);

        // Find endpoint documentation
        if (spec.paths && spec.paths[endpointId]) {
          setEndpointDoc(spec.paths[endpointId]);
        } else if (spec.endpoints) {
          const endpoint = spec.endpoints.find((e: any) => e.path === endpointId);
          if (endpoint) {
            setEndpointDoc(endpoint);
          }
        }
      } catch (e) {
        console.error("Failed to load API spec:", e);
      }
    }
  }, [endpointId]);

  const handleSendRequest = async (request: ApiRequest) => {
    setIsLoading(true);
    setResponse(null);

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

      setResponse({
        status: res.status,
        statusText: res.statusText,
        data: responseData,
        headers: Object.fromEntries(res.headers.entries()),
        duration,
        timestamp: new Date().toISOString(),
      });
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <StatusBar isLoading={isLoading} response={response} />

      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/playground"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Playground
          </Link>

          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Endpoint Documentation
              </h1>
              <p className="text-gray-600 dark:text-gray-400 font-mono">
                {endpointId}
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Documentation Panel */}
          <div className="flex-1">
            {endpointDoc ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Endpoint Details
                </h2>

                {/* Methods */}
                {Object.entries(endpointDoc).map(([method, details]: [string, any]) => {
                  if (method === "parameters" || method === "servers") return null;

                  const methodColors: Record<string, string> = {
                    get: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
                    post: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
                    put: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
                    patch: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
                    delete: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
                  };

                  return (
                    <div key={method} className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 rounded text-sm font-bold uppercase ${methodColors[method] || "bg-gray-100 text-gray-800"}`}>
                          {method}
                        </span>
                        {details.summary && (
                          <span className="text-gray-900 dark:text-white font-medium">
                            {details.summary}
                          </span>
                        )}
                      </div>

                      {details.description && (
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {details.description}
                        </p>
                      )}

                      {details.parameters && details.parameters.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Parameters
                          </h4>
                          <div className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-sm">
                            {details.parameters.map((param: any, idx: number) => (
                              <div key={idx} className="flex items-start gap-2 mb-2 last:mb-0">
                                <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                  {param.name}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400">
                                  ({param.in}: {param.schema?.type || param.type})
                                </span>
                                {param.required && (
                                  <span className="text-red-500 text-xs ml-1">*</span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {details.requestBody && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Request Body
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {details.requestBody.description || "JSON body required"}
                          </p>
                        </div>
                      )}

                      {details.responses && (
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Responses
                          </h4>
                          <div className="space-y-2">
                            {Object.entries(details.responses).map(([statusCode, response]: [string, any]) => (
                              <div
                                key={statusCode}
                                className="bg-gray-50 dark:bg-gray-900 rounded p-3 font-mono text-sm"
                              >
                                <span className="font-bold text-gray-900 dark:text-white">
                                  {statusCode}
                                </span>
                                <span className="text-gray-600 dark:text-gray-400 ml-2">
                                  {response.description}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mb-6">
                <p className="text-yellow-800 dark:text-yellow-200">
                  No documentation found for endpoint: <code className="font-mono">{endpointId}</code>
                </p>
                <p className="text-yellow-700 dark:text-yellow-300 mt-2">
                  Make sure you've loaded an API specification that includes this endpoint.
                </p>
              </div>
            )}

            {/* Request Builder */}
            <RequestBuilder
              onRequest={handleSendRequest}
              apiSpec={apiSpec}
              isLoading={isLoading}
              defaultEndpoint={endpointId}
            />

            {/* Response Viewer */}
            {response && (
              <div className="mt-6">
                <ResponseViewer response={response} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
