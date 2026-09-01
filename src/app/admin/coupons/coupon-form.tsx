import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Coupon } from "@/generated/prisma/client";

const selectClassName =
  "h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50";

export function CouponForm({
  action,
  defaultValues,
}: {
  action: (formData: FormData) => void | Promise<void>;
  defaultValues?: Coupon;
}) {
  return (
    <form action={action} className="max-w-lg space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor="code">Code</Label>
        <Input id="code" name="code" required defaultValue={defaultValues?.code} className="uppercase" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="discountType">Discount Type</Label>
          <select
            id="discountType"
            name="discountType"
            defaultValue={defaultValues?.discountType ?? "percentage"}
            className={selectClassName}
          >
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="discountValue">Discount Value</Label>
          <Input
            id="discountValue"
            name="discountValue"
            type="number"
            step="0.01"
            required
            defaultValue={defaultValues ? String(defaultValues.discountValue) : undefined}
          />
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="appliesTo">Applies To</Label>
          <select
            id="appliesTo"
            name="appliesTo"
            defaultValue={defaultValues?.appliesTo ?? "all"}
            className={selectClassName}
          >
            <option value="all">All</option>
            <option value="course">Course</option>
            <option value="membership">Membership</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="usageLimit">Usage Limit</Label>
          <Input
            id="usageLimit"
            name="usageLimit"
            type="number"
            defaultValue={defaultValues?.usageLimit ?? undefined}
          />
        </div>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="expiresAt">Expires At</Label>
        <Input
          id="expiresAt"
          name="expiresAt"
          type="date"
          defaultValue={defaultValues?.expiresAt ? defaultValues.expiresAt.toISOString().slice(0, 10) : ""}
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}
