import Link from "next/link";
import { requireAdmin } from "@/lib/admin-guard";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdmin();

  const links = [
    { href: "/admin/blogs", label: "Blogs" },
    { href: "/admin/courses", label: "Courses" },
    { href: "/admin/coupons", label: "Coupons" },
  ] as const;

  return (
    <div className="min-h-screen bg-muted/20">
      <header className="border-b bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-sm font-semibold tracking-tight">
              Soul Good Admin
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="hover:text-foreground">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <span className="text-sm text-muted-foreground">{user.name ?? user.email}</span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">{children}</main>
    </div>
  );
}
