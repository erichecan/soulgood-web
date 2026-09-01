import { forbidden } from "next/navigation";
import { auth } from "@/lib/auth";

export async function requireAdmin() {
  const session = await auth();
  const user = session?.user;
  if (!user || user.role !== "ADMIN") {
    forbidden();
  }
  return user;
}
