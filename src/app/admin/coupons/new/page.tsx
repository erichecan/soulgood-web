import { CouponForm } from "../coupon-form";
import { createCouponAction } from "../actions";

export default function NewCouponPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">New Coupon</h1>
      <div className="mt-6">
        <CouponForm action={createCouponAction} />
      </div>
    </div>
  );
}
