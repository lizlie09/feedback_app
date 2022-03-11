import { request } from "umi";

export async function rate(payload) {
  return request(`${API_URL}/rate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
    skipErrorHandler: true,
  });
}

export async function report(payload) {
  return request(`${API_URL}/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
    skipErrorHandler: true,
  });
}
