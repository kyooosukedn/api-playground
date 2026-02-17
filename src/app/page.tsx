"use client";

import { useState } from "react";
import { ApiInput } from "@/components/api-input";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleApiSpecLoad = (spec: any) => {
    // Store spec in localStorage and navigate to playground
    localStorage.setItem("api-spec", JSON.stringify(spec));
    router.push("/playground");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
            API Playground
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Interactive API documentation with live request testing
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md">
              <span className="text-green-600 font-semibold">✓</span> Live Requests
            </div>
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md">
              <span className="text-green-600 font-semibold">✓</span> Syntax Highlighting
            </div>
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md">
              <span className="text-green-600 font-semibold">✓</span> Request History
            </div>
            <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-lg shadow-md">
              <span className="text-green-600 font-semibold">✓</span> Dark Mode
            </div>
          </div>
        </div>

        <ApiInput onSpecLoad={handleApiSpecLoad} />
      </div>
    </main>
  );
}
