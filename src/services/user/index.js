import { request } from "umi";

export async function login(payload) {
  return request(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
    skipErrorHandler: true,
  });
}

export async function signup(payload) {
  return request(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
    skipErrorHandler: true,
  });
}
