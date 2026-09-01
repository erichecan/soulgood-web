import Image from "next/image";
import { useTranslations } from "next-intl";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AboutUsPage() {
  const t = useTranslations("About");

  const cards = [
    { image: "/migrated/about/our-mission.webp", title: t("missionTitle"), body: t("missionBody") },
    { image: "/migrated/about/our-objective.webp", title: t("objectiveTitle"), body: t("objectiveBody") },
    { image: "/migrated/about/our-vision.webp", title: t("visionTitle"), body: t("visionBody") },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
      <h1 className="text-center text-3xl font-semibold tracking-tight">{t("sectionTitle")}</h1>
      <div className="mt-10 grid gap-6 sm:grid-cols-3">
        {cards.map((card) => (
          <Card key={card.title} className="overflow-hidden">
            <Image src={card.image} alt="" width={400} height={300} className="w-full object-cover" />
            <CardHeader>
              <CardTitle className="text-base">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{card.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
