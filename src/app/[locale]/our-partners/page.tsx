import { useTranslations } from "next-intl";
import { PartnersGrid, PartnersContact } from "@/components/partners-grid";

export default function OurPartnersPage() {
  const t = useTranslations("Partners");

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-16">
      <h1 className="text-center text-3xl font-semibold tracking-tight">{t("title")}</h1>
      <div className="mt-10">
        <PartnersGrid />
      </div>
      <PartnersContact />
    </main>
  );
}
