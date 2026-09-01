import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { getCoupon } from "@/lib/db/coupons";
import { CouponForm } from "../coupon-form";
import { deleteCouponAction, updateCouponAction } from "../actions";

export default async function EditCouponPage({ params }: PageProps<"/admin/coupons/[id]">) {
  const { id } = await params;
  const coupon = await getCoupon(id);
  if (!coupon) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Edit Coupon</h1>
        <form action={deleteCouponAction.bind(null, id)}>
          <Button type="submit" variant="destructive" size="sm">
            Delete
          </Button>
        </form>
      </div>
      <div className="mt-6">
        <CouponForm action={updateCouponAction.bind(null, id)} defaultValues={coupon} />
      </div>
    </div>
  );
}
