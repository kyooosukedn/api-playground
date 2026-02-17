"use client";

import { useState } from "react";
import { Copy, Check, ChevronDown, ChevronRight } from "lucide-react";
import { ApiResponse } from "@/types";

interface ResponseViewerProps {
  response: ApiResponse;
}

export function ResponseViewer({ response }: ResponseViewerProps) {
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    body: true,
    headers: false,
  });

  const copyToClipboard = async () => {
    const text = JSON.stringify(response.data, null, 2);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (status >= 300 && status < 400) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    if (status >= 400 && status < 500) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    if (status >= 500) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(response.status)}`}>
            {response.status} {response.statusText}
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {response.duration}ms
          </span>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {new Date(response.timestamp).toLocaleTimeString()}
          </span>
        </div>
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      {/* Response Body */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => toggleSection("body")}
          className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">Response Body</h3>
          {expandedSections.body ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {expandedSections.body && (
          <div className="px-6 pb-4">
            <pre className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
              <code className="text-sm">
                {typeof response.data === "object"
                  ? JSON.stringify(response.data, null, 2)
                  : response.data}
              </code>
            </pre>
          </div>
        )}
      </div>

      {/* Response Headers */}
      <div>
        <button
          onClick={() => toggleSection("headers")}
          className="w-full px-6 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white">Response Headers</h3>
          {expandedSections.headers ? (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-500" />
          )}
        </button>
        {expandedSections.headers && (
          <div className="px-6 pb-4">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
              {Object.entries(response.headers).map(([key, value]) => (
                <div key={key} className="flex py-1 border-b border-gray-200 dark:border-gray-700 last:border-0">
                  <span className="font-medium text-blue-600 dark:text-blue-400 w-48 text-sm">
                    {key}:
                  </span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm flex-1">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
