import { EditorialPage } from "@/components/redesign-site";

export default async function MembershipPage({ params }: PageProps<"/[locale]/membership-pricing">) {
  const { locale } = await params;
  return <EditorialPage page="membership" locale={locale === "zh-hans" ? "zh-hans" : "en"} />;
}
