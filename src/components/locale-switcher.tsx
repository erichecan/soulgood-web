"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export function LocaleSwitcher() {
  const locale = useLocale();
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const nextLocale = locale === "en" ? "zh-hans" : "en";

  return (
    <Button asChild variant="outline" size="sm">
      <Link href={pathname} locale={nextLocale}>
        {t("switchLanguage")}
      </Link>
    </Button>
  );
}
