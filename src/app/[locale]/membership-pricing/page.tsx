import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MembershipPricingPage() {
  const t = useTranslations("Membership");

  const tiers = [
    {
      name: t("normalName"),
      description: null,
      price: t("normalPrice"),
      period: t("normalPeriod"),
      features: t.raw("normalFeatures") as string[],
      highlighted: false,
    },
    {
      name: t("vipName"),
      description: t("vipDescription"),
      price: t("vipPrice"),
      period: t("vipPeriod"),
      features: t.raw("vipFeatures") as string[],
      highlighted: true,
    },
  ];

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="mt-2 text-muted-foreground">{t("subtitle")}</p>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-muted-foreground">{t("intro")}</p>
      </div>
      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {tiers.map((tier) => (
          <Card key={tier.name} className={tier.highlighted ? "border-primary shadow-md" : ""}>
            <CardHeader>
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              {tier.description && (
                <p className="text-xs text-muted-foreground">{tier.description}</p>
              )}
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-semibold">{tier.price}</span>
                <span className="text-sm text-muted-foreground">{tier.period}</span>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-6 w-full"
                variant={tier.highlighted ? "default" : "outline"}
                disabled
                title={t("paymentComingSoon")}
              >
                {t("getCta")}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">{t("paymentComingSoon")}</p>
    </main>
  );
}
