import { request } from "umi";
import store from "store";

export async function getRatertypes(query) {
  const token = store.get("token");
  return request(`${API_URL}/get-ratertypes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function getPendingAndResolved(query) {
  const token = store.get("token");
  return request(`${API_URL}/get-pending-resolved`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function getPerformance(query) {
  const token = store.get("token");
  return request(`${API_URL}/get-performance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function getReportedDepartment(query) {
  const token = store.get("token");
  return request(`${API_URL}/get-reported-department`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function getRespondents(query) {
  const token = store.get("token");
  return request(`${API_URL}/get-respondents`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function updateReport(payload) {
  const token = store.get("token");
  return request(`${API_URL}/reply-report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    data: payload,
    skipErrorHandler: true,
  });
}

export async function getComments(query) {
  const token = store.get("token");
  return request(`${API_URL}/get-comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function getAssignedOfficeComments(query) {
  const token = store.get("token");
  return request(`${API_URL}/get-assignedoffice-comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: query,
    skipErrorHandler: true,
  });
}
