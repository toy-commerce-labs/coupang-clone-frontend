export async function adminFetch(input: RequestInfo | URL, init?: RequestInit) {
  const token = sessionStorage.getItem("adminAccessToken");

  const headers = new Headers(init?.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const res = await fetch(input, { ...init, headers });

  if (res.status === 401 || res.status === 403) {
    sessionStorage.removeItem("adminAccessToken");
    window.location.href = "/admin/sign-in";
    throw new Error("Unauthorized");
  }

  return res;
}
