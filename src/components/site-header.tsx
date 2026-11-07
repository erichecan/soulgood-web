import { Suspense } from "react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { AuthButtons, AuthButtonsSkeleton } from "@/components/auth-buttons";
import type { Locale } from "@/i18n/routing";

const navigation = {
  en: ["Home", "Events", "Membership", "Venue", "About", "Contact"],
  "zh-hans": ["首页", "活动", "会员", "场地", "关于", "联系"],
} as const;

const destinations = ["/", "/events", "/membership-pricing", "/the-space", "/about-us", "/contact"] as const;

export function SiteHeader({ locale }: { locale: Locale }) {
  const labels = navigation[locale === "zh-hans" ? "zh-hans" : "en"];
  const enquire = locale === "zh-hans" ? "咨询场地" : "Enquire about the space";

  return (
    <header className="editorial-header">
      <div className="editorial-header-inner">
        <Link href="/" className="editorial-brand" aria-label="Soul Good home">
          <Image src="/migrated/brand/header-logo.svg" alt="Soul Good Happy Women's Club" width={120} height={79} priority />
        </Link>
        <nav className="editorial-nav" aria-label="Main navigation">
          {destinations.map((href, index) => <Link href={href} key={href}>{labels[index]}</Link>)}
        </nav>
        <div className="editorial-header-actions">
          <LocaleSwitcher />
          <Suspense fallback={<AuthButtonsSkeleton />}><AuthButtons locale={locale} /></Suspense>
          <Link className="editorial-header-cta" href="/the-space/inquiry">{enquire}<span aria-hidden="true">↗</span></Link>
        </div>
        <details className="editorial-mobile-nav">
          <summary aria-label={locale === "zh-hans" ? "打开导航" : "Open navigation"}><span></span><span></span></summary>
          <nav aria-label="Mobile navigation">
            {destinations.map((href, index) => <Link href={href} key={href}>{labels[index]}</Link>)}
            <Link href="/courses">{locale === "zh-hans" ? "课程" : "Courses"}</Link>
            <Link href="/the-space/inquiry">{enquire}</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
