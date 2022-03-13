
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