"use client";

import { useState } from "react";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";
import yaml from "js-yaml";

interface ApiInputProps {
  onSpecLoad: (spec: any) => void;
}

export function ApiInput({ onSpecLoad }: ApiInputProps) {
  const [specText, setSpecText] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [specFormat, setSpecFormat] = useState<"JSON" | "YAML" | null>(null);
  const [parsedSpec, setParsedSpec] = useState<any>(null);

  const validateSpec = (text: string): any => {
    // Try JSON first
    try {
      const parsed = JSON.parse(text);
      if (parsed.openapi || parsed.swagger || parsed.paths || parsed.endpoints) {
        return { parsed, format: "JSON" as const };
      }
      throw new Error("Invalid API specification format. Must be a valid OpenAPI/Swagger spec.");
    } catch {
      // If not valid JSON, try YAML
      try {
        const parsed = yaml.load(text, { schema: yaml.JSON_SCHEMA }) as any;
        if (parsed && (parsed.openapi || parsed.swagger || parsed.paths || parsed.endpoints)) {
          return { parsed, format: "YAML" as const };
        }
        throw new Error("Invalid API specification format. Must contain 'openapi', 'swagger', 'paths', or 'endpoints' fields.");
      } catch (yamlError) {
        if (yamlError instanceof Error && yamlError.message.includes("Invalid API")) {
          throw yamlError;
        }
        throw new Error("Could not parse specification. Please provide valid JSON or YAML.");
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setSpecText(text);
    setError("");
    setIsValid(null);
    setSpecFormat(null);
    setParsedSpec(null);

    if (text.trim()) {
      try {
        const { parsed, format } = validateSpec(text);
        setIsValid(true);
        setSpecFormat(format);
        setParsedSpec(parsed);
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
        const { parsed, format } = validateSpec(content);
        setIsValid(true);
        setSpecFormat(format);
        setParsedSpec(parsed);
        setError("");
      } catch (err) {
        setIsValid(false);
        setSpecFormat(null);
        setParsedSpec(null);
        setError(err instanceof Error ? err.message : "Invalid file format");
      }
    };
    reader.readAsText(file);
  };

  const handleLoad = () => {
    if (!isValid || !parsedSpec) return;
    onSpecLoad(parsedSpec);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Load API Specification
      </h2>

      <div className="mb-6">
        <label htmlFor="api-file-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload OpenAPI/Swagger File (JSON or YAML)
        </label>
        <div className="flex items-center gap-4">
          <label htmlFor="api-file-upload" className="flex-1 cursor-pointer">
            <div className="flex items-center justify-center gap-2 px-6 py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors">
              <Upload className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {specText ? "Replace file" : "Choose file"}
              </span>
            </div>
            <input
              id="api-file-upload"
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
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  {specFormat && (
                    <span className="px-1.5 py-0.5 text-xs font-semibold rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {specFormat}
                    </span>
                  )}
                </>
              )}
              {isValid === false && (
                <XCircle className="w-4 h-4 text-red-500" />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <label htmlFor="api-spec-textarea" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Or paste OpenAPI/JSON specification
        </label>
        <textarea
          id="api-spec-textarea"
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
          aria-describedby={error ? "api-spec-error" : undefined}
          className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
        {error && (
          <p id="api-spec-error" role="alert" className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}
      </div>

      <button
        onClick={handleLoad}
        disabled={!isValid || !parsedSpec}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <FileText className="w-5 h-5" />
        Load Specification & Open Playground
      </button>
    </div>
  );
}
