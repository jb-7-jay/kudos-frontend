export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  access: string;
  refresh: string;
}

const baseURL = import.meta.env.VITE_KUDOS_BACKEND_API!;

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  const response = await fetch(`${baseURL}/api/users/login/`, {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Login failed");
  }

  const data = await response.json();

  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);
  localStorage.setItem("user", JSON.stringify(data.user));

  return data;
}
