import { ApiRequest } from "@/types";

const KEYS = {
  API_SPEC: "api-spec",
  REQUEST_HISTORY: "request-history",
  REPLAY_REQUEST: "replay-request",
} as const;

export const storage = {
  getApiSpec: (): any | null => {
    try {
      const val = localStorage.getItem(KEYS.API_SPEC);
      return val ? JSON.parse(val) : null;
    } catch {
      return null;
    }
  },
  setApiSpec: (spec: any): void => {
    localStorage.setItem(KEYS.API_SPEC, JSON.stringify(spec));
  },
  getHistory: (): ApiRequest[] => {
    try {
      const val = localStorage.getItem(KEYS.REQUEST_HISTORY);
      return val ? JSON.parse(val) : [];
    } catch {
      return [];
    }
  },
  setHistory: (history: ApiRequest[]): void => {
    localStorage.setItem(KEYS.REQUEST_HISTORY, JSON.stringify(history));
  },
  clearHistory: (): void => {
    localStorage.removeItem(KEYS.REQUEST_HISTORY);
  },
  getReplayRequest: (): ApiRequest | null => {
    try {
      const val = localStorage.getItem(KEYS.REPLAY_REQUEST);
      if (!val) return null;
      const req = JSON.parse(val);
      localStorage.removeItem(KEYS.REPLAY_REQUEST); // auto-clear on read
      return req;
    } catch {
      return null;
    }
  },
  setReplayRequest: (req: ApiRequest): void => {
    localStorage.setItem(KEYS.REPLAY_REQUEST, JSON.stringify(req));
  },
};
