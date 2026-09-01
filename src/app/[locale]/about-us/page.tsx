import { useTranslations } from "next-intl";

export default function AboutUsPage() {
  const t = useTranslations("About");

  const sections = [
    { title: t("missionTitle"), body: t("missionBody") },
    { title: t("visionTitle"), body: t("visionBody") },
    { title: t("objectiveTitle"), body: t("objectiveBody") },
  ];

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{t("intro")}</p>
      <div className="mt-12 space-y-8">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
            <p className="mt-2 text-muted-foreground">{section.body}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
