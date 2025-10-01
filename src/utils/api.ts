export const api = async (url: string, options: any = {}) => {
  const token = sessionStorage.getItem("authToken");

  const fetchOptions: RequestInit = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: token ? `Bearer ${token}` : "",
    },
  };

  // Automatically stringify body if it's an object
  if (options.body && typeof options.body === "object") {
    fetchOptions.body = JSON.stringify(options.body);
  }

  const res = await fetch(url, fetchOptions);

  if (res.status === 401) {
    sessionStorage.removeItem("authToken");
    throw new Error("Unauthorized. Please login again.");
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || "API request failed");
  }

  return res.json();
};
