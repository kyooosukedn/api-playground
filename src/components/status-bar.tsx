"use client";

import { ApiResponse } from "@/types";
import { CheckCircle, XCircle, Clock, Wifi } from "lucide-react";

interface StatusBarProps {
  isLoading: boolean;
  response: ApiResponse | null;
}

export function StatusBar({ isLoading, response }: StatusBarProps) {
  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex items-center justify-between text-sm">
      <div className="flex items-center gap-6">
        {/* Connection Status */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Wifi className="w-4 h-4 text-green-500" />
          <span>Connected</span>
        </div>

        {/* Loading Status */}
        {isLoading && (
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Loading...</span>
          </div>
        )}

        {/* Proxy Badge */}
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">
          🔒 via proxy
        </div>

        {/* Response Status */}
        {response && !isLoading && (
          <div className="flex items-center gap-2">
            {response.status >= 200 && response.status < 300 ? (
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span>Success - {response.status}</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <XCircle className="w-4 h-4" />
                <span>Error - {response.status}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Timestamp */}
      <div className="text-gray-500 dark:text-gray-400 text-xs">
        {new Date().toLocaleString()}
      </div>
    </div>
  );
}
