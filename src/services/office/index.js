
import { request } from "umi";
import store from "store"

export async function getOffices(params) {
  const token = store.get("token");
  return request(`${API_URL}/get-offices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    query: params,
    skipErrorHandler: true,
  });
}

export async function addOffice(payload) {
  const token = store.get("token");
  return request(`${API_URL}/create-office`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    skipErrorHandler: true,
  });
}

export async function editOffice(payload) {
  const token = store.get("token");
  return request(`${API_URL}/edit-office`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    skipErrorHandler: true,
  });
}