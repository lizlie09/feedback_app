import { request } from "umi";

export async function login(payload) {
  return request(`${API_URL}/admin-log-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
    skipErrorHandler: true,
  });
}
