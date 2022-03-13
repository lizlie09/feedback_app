
import { request } from "umi";

export async function getOffices(params) {
  return request(`${API_URL}/get-offices`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: params,
    skipErrorHandler: true,
  });
}

export async function addOffice(payload) {
  return request(`${API_URL}/create-office`, {
    method: "POST",
    data: payload,
    skipErrorHandler: true,
  });
}

export async function editOffice(payload) {
  return request(`${API_URL}/edit-office`, {
    method: "POST",
    data: payload,
    skipErrorHandler: true,
  });
}