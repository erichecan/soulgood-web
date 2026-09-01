import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getPathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth, signOut } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import type { Locale } from "@/i18n/routing";

export default async function DashboardPage({ params }: PageProps<"/[locale]/dashboard">) {
  const { locale } = await params;
  const session = await auth();

  if (!session?.user) {
    redirect(getPathname({ href: "/login", locale: locale as Locale }));
  }

  const t = await getTranslations("Dashboard");

  const [subscriptions, enrollments] = await Promise.all([
    prisma.membershipSubscription.findMany({ where: { userId: session.user.id } }),
    prisma.enrollment.findMany({
      where: { userId: session.user.id },
      include: { course: true },
    }),
  ]);

  async function logoutAction() {
    "use server";
    await signOut({ redirectTo: getPathname({ href: "/", locale: locale as Locale }) });
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-16">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
          <p className="mt-1 text-muted-foreground">
            {t("welcome", { name: session.user.name ?? session.user.email ?? "" })}
          </p>
        </div>
        <form action={logoutAction}>
          <Button type="submit" variant="outline">
            {t("logoutCta")}
          </Button>
        </form>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>{t("membershipSectionTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            {subscriptions.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("noMembership")}</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {subscriptions.map((subscription) => (
                  <li key={subscription.id}>
                    {subscription.tier} &middot; {subscription.status}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>{t("enrollmentsSectionTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            {enrollments.length === 0 ? (
              <p className="text-sm text-muted-foreground">{t("noEnrollments")}</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {enrollments.map((enrollment) => (
                  <li key={enrollment.id}>
                    {locale === "zh-hans"
                      ? enrollment.course.titleZh ?? enrollment.course.titleEn
                      : enrollment.course.titleEn}{" "}
                    &middot; {enrollment.status}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
