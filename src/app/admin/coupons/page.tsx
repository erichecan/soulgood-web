import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { listCoupons } from "@/lib/db/coupons";
import { deleteCouponAction } from "./actions";

export default async function AdminCouponsPage() {
  const coupons = await listCoupons();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Coupons</h1>
        <Button asChild size="sm">
          <Link href="/admin/coupons/new">New Coupon</Link>
        </Button>
      </div>
      <Table className="mt-6">
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Applies To</TableHead>
            <TableHead>Used</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell className="font-mono">{coupon.code}</TableCell>
              <TableCell>
                {coupon.discountType === "percentage" ? `${String(coupon.discountValue)}%` : `$${String(coupon.discountValue)}`}
              </TableCell>
              <TableCell className="text-muted-foreground">{coupon.appliesTo}</TableCell>
              <TableCell>
                {coupon.usedCount}
                {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ""}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/coupons/${coupon.id}`}>Edit</Link>
                  </Button>
                  <form action={deleteCouponAction.bind(null, coupon.id)}>
                    <Button type="submit" variant="destructive" size="sm">
                      Delete
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {coupons.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No coupons yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
