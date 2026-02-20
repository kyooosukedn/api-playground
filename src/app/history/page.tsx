"use client";

import { useEffect, useState } from "react";
import { RequestHistory } from "@/components/request-history";
import { ApiRequest } from "@/types";
import { useRouter } from "next/navigation";
import { storage } from "@/lib/storage";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<ApiRequest[]>([]);

  useEffect(() => {
    setHistory(storage.getHistory());
  }, []);

  const handleReplay = (request: ApiRequest) => {
    // Store the request to replay and navigate to playground
    storage.setReplayRequest(request);
    router.push("/playground");
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Request History
        </h1>
        <div className="max-w-md mx-auto">
          <RequestHistory history={history} onReplay={handleReplay} />
        </div>
      </div>
    </main>
  );
}
