export interface ApiRequest {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  headers: Record<string, string>;
  body?: any;
  queryParams: Record<string, string>;
  timestamp: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  data: any;
  headers: Record<string, string>;
  duration: number;
  timestamp: string;
}

export interface ApiSpec {
  openapi?: string;
  swagger?: string;
  info?: {
    title: string;
    version: string;
    description?: string;
  };
  paths?: Record<string, any>;
  endpoints?: any[];
}

export interface MethodBadgeProps {
  method: string;
}

export interface HeaderEditorProps {
  headers: Record<string, string>;
  onChange: (headers: Record<string, string>) => void;
}

export interface QueryParamEditorProps {
  queryParams: Record<string, string>;
  onChange: (params: Record<string, string>) => void;
}
