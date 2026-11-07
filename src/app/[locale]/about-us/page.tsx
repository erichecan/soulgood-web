import { EditorialPage } from "@/components/redesign-site";

export default async function AboutPage({ params }: PageProps<"/[locale]/about-us">) {
  const { locale } = await params;
  return <EditorialPage page="about" locale={locale === "zh-hans" ? "zh-hans" : "en"} />;
}
