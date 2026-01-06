export const ErrorType = {
  Network: "Network",
  Validation: "Validation",
  Timeout: "Timeout",
  Unknown: "Unknown",
};

export function classifyError(err) {
  const status = err?.response?.status;

  const isTimeout =
    err?.code === "ECONNABORTED" ||
    String(err?.message || "")
      .toLowerCase()
      .includes("timeout");

  if (isTimeout) return ErrorType.Timeout;

  const isNetwork = !!err?.request && !err?.response;
  if (isNetwork) return ErrorType.Network;

  if (status === 400 || status === 422) return ErrorType.Validation;

  if (status >= 500 && status <= 599) return ErrorType.Network;

  return ErrorType.Unknown;
}

export function toAppError(err) {
  const type = classifyError(err);
  const status = err?.response?.status;
  const serverMsg = err?.response?.data?.message;

  const appError = {
    type,
    status,
    retryable: type === ErrorType.Network,
    message: "Something went wrong.",
    details: err?.response?.data || null,
  };

  if (type === ErrorType.Network) {
    appError.message = "Network error. Please check your connection.";
    return appError;
  }

  if (type === ErrorType.Timeout) {
    appError.message = "Request timed out. Please try again.";
    return appError;
  }

  if (type === ErrorType.Validation) {
    appError.message = serverMsg || "Invalid input. Please review your data.";
    return appError;
  }

  appError.message = serverMsg || appError.message;
  return appError;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

export async function withRetry(fn, { retries = 2, baseDelayMs = 300 } = {}) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      const appError = toAppError(err);

      if (!appError.retryable || attempt === retries) {
        throw appError;
      }

      const delay = baseDelayMs * Math.pow(2, attempt);
      await sleep(delay);
    }
  }
}
