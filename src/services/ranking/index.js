
import { request } from "umi";
import store from "store"

export async function getRankings(query) {
  const token = store.get("token");
  return request(`${API_URL}/get-rankings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: query,
    skipErrorHandler: true,
  });
}