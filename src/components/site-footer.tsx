import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

const footerCopy = {
  en: {
    lead: <>Good things happen<br />when we <em>come together.</em></>,
    groups: [
      { title: "EXPLORE", links: [["Events & Workshops", "/events"], ["Membership", "/membership-pricing"], ["The Space", "/the-space"], ["Courses", "/courses"]] },
      { title: "DISCOVER", links: [["About Us", "/about-us"], ["Contact", "/contact"], ["FAQ", "/faq"]] },
      { title: "POLICIES", links: [["Privacy", "/privacy"], ["Membership Terms", "/membership-terms"], ["Refunds", "/refunds"], ["Event Guidelines", "/event-guidelines"]] },
    ],
    location: "SOUL GOOD / HAPPY WOMEN'S CLUB · NORTH YORK, TORONTO",
    note: "Visual concept · event and membership details subject to confirmation",
  },
  "zh-hans": {
    lead: <>相聚在一起，<br /><span className="footer-lead-nowrap">美好自然<em>发生。</em></span></>,
    groups: [
      { title: "探索", links: [["活动与工作坊", "/events"], ["会员", "/membership-pricing"], ["场地空间", "/the-space"], ["课程", "/courses"]] },
      { title: "认识我们", links: [["关于我们", "/about-us"], ["联系", "/contact"], ["常见问题", "/faq"]] },
      { title: "相关政策", links: [["隐私政策", "/privacy"], ["会员条款", "/membership-terms"], ["退款政策", "/refunds"], ["活动须知", "/event-guidelines"]] },
    ],
    location: "SOUL GOOD / 快乐女性俱乐部 · 多伦多北约克",
    note: "视觉概念 · 活动与会员详情以最终确认为准",
  },
} as const;

export function SiteFooter({ locale = "en" }: { locale?: Locale }) {
  const content = footerCopy[locale === "zh-hans" ? "zh-hans" : "en"];
  return (
    <footer className="editorial-footer">
      <div className="editorial-footer-main">
        <Link href="/" className="editorial-footer-brand"><Image src="/migrated/brand/footer-logo.svg" alt="Soul Good" width={120} height={79} />{content.lead}</Link>
        <div className="editorial-footer-groups">
          {content.groups.map((group) => <div key={group.title}><h2>{group.title}</h2><ul>{group.links.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul></div>)}
        </div>
      </div>
      <div className="editorial-footer-bottom"><span>{content.location}</span><span>{content.note}</span></div>
    </footer>
  );
}
