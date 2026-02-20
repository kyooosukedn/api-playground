"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Play, Home, History } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav aria-label="Main navigation" className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
          <Play className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
          API Playground
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-current={isActive("/") ? "page" : undefined}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isActive("/")
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Home</span>
            <span className="sr-only sm:hidden">Home</span>
          </Link>
          <Link
            href="/playground"
            aria-current={isActive("/playground") ? "page" : undefined}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isActive("/playground")
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            <Play className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Playground</span>
            <span className="sr-only sm:hidden">Playground</span>
          </Link>
          <Link
            href="/history"
            aria-current={isActive("/history") ? "page" : undefined}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              isActive("/history")
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            }`}
          >
            <History className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">History</span>
            <span className="sr-only sm:hidden">History</span>
          </Link>

          {/* Theme Toggle */}
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
