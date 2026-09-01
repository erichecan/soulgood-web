"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin-guard";
import { createCoupon, deleteCoupon, updateCoupon, type CouponInput } from "@/lib/db/coupons";

function parseCouponInput(formData: FormData): CouponInput {
  const expiresAt = String(formData.get("expiresAt") ?? "").trim();
  const usageLimit = String(formData.get("usageLimit") ?? "").trim();
  return {
    code: String(formData.get("code") ?? "")
      .trim()
      .toUpperCase(),
    discountType: String(formData.get("discountType") ?? "percentage"),
    discountValue: Number(formData.get("discountValue") ?? 0),
    appliesTo: String(formData.get("appliesTo") ?? "all"),
    expiresAt: expiresAt ? new Date(expiresAt) : null,
    usageLimit: usageLimit ? Number(usageLimit) : null,
  };
}

export async function createCouponAction(formData: FormData) {
  await requireAdmin();
  await createCoupon(parseCouponInput(formData));
  revalidatePath("/admin/coupons");
  redirect("/admin/coupons");
}

export async function updateCouponAction(id: string, formData: FormData) {
  await requireAdmin();
  await updateCoupon(id, parseCouponInput(formData));
  revalidatePath("/admin/coupons");
  redirect("/admin/coupons");
}

export async function deleteCouponAction(id: string) {
  await requireAdmin();
  await deleteCoupon(id);
  revalidatePath("/admin/coupons");
}
