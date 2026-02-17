"use client";

import { useEffect, useState } from "react";
import { RequestHistory } from "@/components/request-history";
import { ApiRequest } from "@/types";
import { useRouter } from "next/navigation";

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<ApiRequest[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem("request-history");
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory));
      } catch (e) {
        console.error("Failed to load request history:", e);
      }
    }
  }, []);

  const handleReplay = (request: ApiRequest) => {
    // Store the request to replay and navigate to playground
    localStorage.setItem("replay-request", JSON.stringify(request));
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
