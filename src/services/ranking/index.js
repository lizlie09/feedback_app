
import { request } from "umi";

export async function getRankings(params) {
  return request(`${API_URL}/get-rankings`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: params,
    skipErrorHandler: true,
  });
}