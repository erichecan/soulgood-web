import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  const links = [
    { href: "/about-us", label: nav("aboutUs") },
    { href: "/courses", label: nav("courses") },
    { href: "/blogs", label: nav("blogs") },
    { href: "/membership-pricing", label: nav("membership") },
    { href: "/our-partners", label: nav("ourPartners") },
  ] as const;

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold tracking-tight">Soul Good Wellness Club</p>
          <p className="mt-2 text-sm text-muted-foreground">{t("address")}</p>
          <p className="mt-1 text-sm text-muted-foreground">{t("phone")}</p>
        </div>
        <div>
          <p className="text-sm font-medium">{t("quickLinksTitle")}</p>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Soul Good Wellness Club. {t("rights")}
      </div>
    </footer>
  );
}
