import { Suspense } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { AuthButtons, AuthButtonsSkeleton } from "@/components/auth-buttons";
import type { Locale } from "@/i18n/routing";

export function SiteHeader({ locale }: { locale: Locale }) {
  const t = useTranslations("Nav");

  const links = [
    { href: "/", label: t("home") },
    { href: "/about-us", label: t("aboutUs") },
    { href: "/courses", label: t("courses") },
    { href: "/blogs", label: t("blogs") },
    { href: "/membership-pricing", label: t("membership") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/migrated/brand/header-logo.svg"
            alt="Soul Good Happy Women's Club"
            width={120}
            height={79}
            className="h-10 w-auto"
            priority
          />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <Suspense fallback={<AuthButtonsSkeleton />}>
            <AuthButtons locale={locale} />
          </Suspense>
          <Button asChild size="sm">
            <Link href="/membership-pricing">{t("pricing")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
