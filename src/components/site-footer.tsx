import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  const links = [
    { href: "/", label: nav("home") },
    { href: "/courses", label: nav("courses") },
    { href: "/blogs", label: nav("blogs") },
    { href: "/membership-pricing", label: nav("membership") },
    { href: "/about-us", label: nav("aboutUs") },
    { href: "/our-partners", label: nav("ourPartners") },
  ] as const;

  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-3">
        <div>
          <Image
            src="/migrated/brand/footer-logo.svg"
            alt="Soul Good Happy Women's Club"
            width={120}
            height={79}
            className="h-10 w-auto"
          />
        </div>
        <div>
          <p className="text-sm font-medium">{nav("club")}</p>
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
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>{t("phone")}</p>
          <p>{t("email")}</p>
          <p>{t("address")}</p>
        </div>
      </div>
      <div className="border-t px-4 py-4 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} {t("rights")}
      </div>
    </footer>
  );
}
