import axios from "axios";
import { withRetry } from "../core/error/errorManager";

export const API_URL = "http://localhost:3001";

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export async function request(config, retryOptions) {
  const method = String(config?.method || "GET").toUpperCase();
  const safeRetryOptions =
    method === "GET" ? retryOptions : { retries: 0, baseDelayMs: 0 };

  return withRetry(async () => {
    const res = await api.request(config);
    return res.data;
  }, safeRetryOptions);
}
