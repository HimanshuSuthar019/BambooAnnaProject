export const API_URL = "https://bambooannaproject-backend.onrender.com/api";

export async function apiFetch(endpoint, options = {}) {
  const token = localStorage.getItem("bamboo-token");

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
