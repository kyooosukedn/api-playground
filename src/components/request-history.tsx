"use client";

import { useState } from "react";
import { History, Search, Play, Trash2, ChevronRight } from "lucide-react";
import { ApiRequest } from "@/types";

interface RequestHistoryProps {
  history: ApiRequest[];
  onReplay: (request: ApiRequest) => void;
}

const METHOD_COLORS: Record<string, string> = {
  GET: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  POST: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  PUT: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  DELETE: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  PATCH: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export function RequestHistory({ history, onReplay }: RequestHistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredHistory = history.filter((req) => {
    const search = searchTerm.toLowerCase();
    return (
      req.url.toLowerCase().includes(search) ||
      req.method.toLowerCase().includes(search)
    );
  });

  const clearHistory = () => {
    if (confirm("Are you sure you want to clear all history?")) {
      localStorage.removeItem("request-history");
      window.location.reload();
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
          <History className="w-5 h-5" aria-hidden="true" />
          Request History
        </h2>
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            Clear
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" aria-hidden="true" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search history..."
          aria-label="Search request history"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* History List */}
      <div className="space-y-2 max-h-[600px] overflow-y-auto">
        {filteredHistory.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm py-8">
            {history.length === 0
              ? "No requests yet. Send your first request!"
              : "No matching requests found."}
          </p>
        ) : (
          filteredHistory.map((request) => (
            <button
              key={request.id}
              className="w-full text-left p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer group"
              onClick={() => onReplay(request)}
              aria-label={`Replay ${request.method} ${request.url}`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${METHOD_COLORS[request.method]} whitespace-nowrap`}
                >
                  {request.method}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {request.url}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatDate(request.timestamp)}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors mt-1" aria-hidden="true" />
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
