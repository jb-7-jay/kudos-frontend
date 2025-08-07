const baseURL = import.meta.env.VITE_KUDOS_BACKEND_API!;

const getToken = () => localStorage.getItem("access_token");

export const getOrgUsers = async () => {
  const res = await fetch(`${baseURL}/api/organizations/org-users`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch organization users");
  }

  return res.json();
};

export const createKudos = async (payload: {
  receiver_id: number;
  message: string;
}) => {
  const res = await fetch(`${baseURL}/api/kudos/create/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json();

    const errorMessage =
      error?.non_field_errors?.[0] || error?.message || "Failed to send kudos";

    throw new Error(errorMessage);
  }

  return res.json();
};

export const getKudosActivity = async () => {
  const res = await fetch(`${baseURL}/api/kudos/activity`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to load activity");
  }

  return res.json();
};
