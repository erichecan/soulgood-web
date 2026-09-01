import { getTranslations } from "next-intl/server";
import { Link, getPathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";
import type { Locale } from "@/i18n/routing";

export async function AuthButtons({ locale }: { locale: Locale }) {
  const navT = await getTranslations("Nav");
  const dashboardT = await getTranslations("Dashboard");
  const session = await auth();

  if (!session?.user) {
    return (
      <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
        <Link href="/login">{navT("login")}</Link>
      </Button>
    );
  }

  async function logoutAction() {
    "use server";
    await signOut({ redirectTo: getPathname({ href: "/", locale }) });
  }

  return (
    <>
      <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
        <Link href="/dashboard">{dashboardT("title")}</Link>
      </Button>
      <form action={logoutAction}>
        <Button type="submit" variant="ghost" size="sm">
          {dashboardT("logoutCta")}
        </Button>
      </form>
    </>
  );
}

export function AuthButtonsSkeleton() {
  return <div className="hidden h-7 w-14 animate-pulse rounded-md bg-muted sm:block" />;
}
