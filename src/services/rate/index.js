import { request } from "umi";
import store from "store"

export async function rate(payload) {
  const token = store.get("token");
  return request(`${API_URL}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    skipErrorHandler: true,
  });
}

export async function report(payload) {
  const token = store.get("token");
  return request(`${API_URL}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    skipErrorHandler: true,
  });
}
