import { cookies } from "next/headers";

const TOKEN_NAME = "bq_admin_token";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "bytequest2024";
}

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(TOKEN_NAME)?.value;
  return token === getAdminPassword();
}
