
import { request } from "umi";

export async function getRankings(query) {
  return request(`${API_URL}/get-rankings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: query,
    skipErrorHandler: true,
  });
}