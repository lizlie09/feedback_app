import { request } from "umi";
import store from "store";

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

export async function getAdmins(query) {
  return request(`${API_URL}/get-admins`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function addAdmin(payload) {
  return request(`${API_URL}/add-admin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: payload,
    skipErrorHandler: true,
  });
}

export async function removeScope(query) {
  return request(`${API_URL}/remove-scope`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function changePassword(payload) {
  const token = store.get("token");
  return request(`${API_URL}/change-password`, {
    method: "POST",
    data: payload,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    skipErrorHandler: true,
  });
}
