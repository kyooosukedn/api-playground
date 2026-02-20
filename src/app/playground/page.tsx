"use client";

import { useState, useEffect } from "react";
import { RequestBuilder } from "@/components/request-builder";
import { ResponseViewer } from "@/components/response-viewer";
import { StatusBar } from "@/components/status-bar";
import { RequestHistory } from "@/components/request-history";
import { ApiRequest } from "@/types";
import { storage } from "@/lib/storage";
import { useApiRequest } from "@/lib/hooks/useApiRequest";

export default function PlaygroundPage() {
  const [apiSpec, setApiSpec] = useState<any>(null);
  const [currentRequest, setCurrentRequest] = useState<ApiRequest | null>(null);
  const [history, setHistory] = useState<ApiRequest[]>([]);
  const { sendRequest, response, isLoading } = useApiRequest();

  // Load API spec and replay request from localStorage on mount
  useEffect(() => {
    const spec = storage.getApiSpec();
    if (spec) setApiSpec(spec);

    // Check for replay request (auto-cleared on read)
    const replayRequest = storage.getReplayRequest();
    if (replayRequest) setCurrentRequest(replayRequest);

    // Load request history from localStorage
    setHistory(storage.getHistory());
  }, []);

  const handleSendRequest = async (request: ApiRequest) => {
    setCurrentRequest(request);
    await sendRequest(request);
    // Refresh history from storage after send
    setHistory(storage.getHistory());
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
