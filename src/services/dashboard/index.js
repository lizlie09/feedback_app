import { request } from "umi";

export async function getRatertypes(params) {
  return request(`${API_URL}/get-ratertypes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: params,
    skipErrorHandler: true,
  });
}

export async function getPerformance(params) {
  return request(`${API_URL}/get-performance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: params,
    skipErrorHandler: true,
  });
}

export async function getReportedDepartment(params) {
  return request(`${API_URL}/get-reported-department`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: params,
    skipErrorHandler: true,
  });
}

export async function getComments(params) {
  return request(`${API_URL}/get-comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    query: params,
    skipErrorHandler: true,
  });
}
