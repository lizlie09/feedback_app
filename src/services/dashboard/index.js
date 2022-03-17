import { request } from "umi";

export async function getRatertypes(query) {
  return request(`${API_URL}/get-ratertypes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function getPerformance(query) {
  return request(`${API_URL}/get-performance`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function getReportedDepartment(query) {
  return request(`${API_URL}/get-reported-department`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function getRespondents(query) {
  return request(`${API_URL}/get-respondents`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function updateReport(payload) {
  return request(`${API_URL}/reply-report`, {
    method: "POST",
    data: payload,
    skipErrorHandler: true,
  });
}

export async function getComments(query) {
  return request(`${API_URL}/get-comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: query,
    skipErrorHandler: true,
  });
}

export async function getAssignedOfficeComments(query) {
  return request(`${API_URL}/get-assignedoffice-comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    params: query,
    skipErrorHandler: true,
  });
}
