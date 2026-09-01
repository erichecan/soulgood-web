import { prisma } from "@/lib/db/prisma";

export function listCoupons() {
  return prisma.coupon.findMany({ orderBy: { createdAt: "desc" } });
}

export function getCoupon(id: string) {
  return prisma.coupon.findUnique({ where: { id } });
}

export type CouponInput = {
  code: string;
  discountType: string;
  discountValue: number;
  appliesTo: string;
  expiresAt: Date | null;
  usageLimit: number | null;
};

export function createCoupon(input: CouponInput) {
  return prisma.coupon.create({ data: input });
}

export function updateCoupon(id: string, input: CouponInput) {
  return prisma.coupon.update({ where: { id }, data: input });
}

export function deleteCoupon(id: string) {
  return prisma.coupon.delete({ where: { id } });
}
