"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";

interface ApiInputProps {
  onSpecLoad: (spec: any) => void;
}

export function ApiInput({ onSpecLoad }: ApiInputProps) {
  const [specText, setSpecText] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);

  const validateSpec = (text: string) => {
    try {
      const parsed = JSON.parse(text);
      // Basic validation - check if it has some OpenAPI fields
      if (parsed.openapi || parsed.swagger || parsed.paths || parsed.endpoints) {
        return parsed;
      }
      throw new Error("Invalid API specification format");
    } catch (e) {
      // Try YAML parsing (simple check)
      if (text.includes("openapi:") || text.includes("swagger:") || text.includes("paths:")) {
        // For MVP, we'll accept YAML format but note it would need js-yaml
        return { raw: text, format: "yaml" };
      }
      throw e;
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSpecText(text);
    setError("");
    setIsValid(null);

    if (text.trim()) {
      try {
        const parsed = validateSpec(text);
        setIsValid(true);
      } catch (err) {
        setIsValid(false);
        setError(err instanceof Error ? err.message : "Invalid format");
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setSpecText(content);
      try {
        const parsed = validateSpec(content);
        setIsValid(true);
        setError("");
      } catch (err) {
        setIsValid(false);
        setError(err instanceof Error ? err.message : "Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const handleLoad = () => {
    if (!isValid || !specText) return;

    try {
      const parsed = validateSpec(specText);
      onSpecLoad(parsed);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load specification");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Load API Specification
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload OpenAPI/Swagger File (JSON or YAML)
        </label>
        <div className="flex items-center gap-4">
          <label className="flex-1 cursor-pointer">
            <div className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <Upload className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {specText ? "Replace file" : "Choose file"}
              </span>
            </div>
            <input
              type="file"
              accept=".json,.yaml,.yml"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          {specText && (
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FileText className="w-4 h-4" />
              <span>Spec loaded</span>
              {isValid === true && (
                <CheckCircle className="w-4 h-4 text-green-500" />
              )}
              {isValid === false && (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Or paste OpenAPI/JSON specification
        </label>
        <textarea
          value={specText}
          onChange={handleTextChange}
          placeholder='{
  "openapi": "3.0.0",
  "info": {
    "title": "Sample API",
    "version": "1.0.0"
  },
  "paths": {
    "/users": {
      "get": {
        "summary": "List users",
        "responses": { "200": { "description": "Success" } }
      }
    }
  }
}'
          className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        {error && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      <button
        onClick={handleLoad}
        disabled={!isValid || !specText}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <FileText className="w-5 h-5" />
        Load Specification & Open Playground
      </button>
    </div>
  );
}
