import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { AuthError } from "next-auth";
import { Link, getPathname } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/lib/auth";
import { createUserWithPassword, findUserByEmail } from "@/lib/db/users";
import { authErrorMessageKey } from "@/lib/auth-error-messages";
import type { Locale } from "@/i18n/routing";

export default async function RegisterPage({
  params,
  searchParams,
}: PageProps<"/[locale]/register">) {
  const { locale } = await params;
  const sp = await searchParams;
  const errorCode = typeof sp.error === "string" ? sp.error : undefined;
  const t = await getTranslations("Auth");

  async function registerAction(formData: FormData) {
    "use server";
    const registerPath = getPathname({ href: "/register", locale: locale as Locale });

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "")
      .trim()
      .toLowerCase();
    const password = String(formData.get("password") ?? "");

    if (password.length < 8) {
      redirect(`${registerPath}?error=password-too-short`);
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      redirect(`${registerPath}?error=duplicate-email`);
    }

    await createUserWithPassword({ email, name, password });

    try {
      await signIn("credentials", {
        email,
        password,
        redirectTo: getPathname({ href: "/dashboard", locale: locale as Locale }),
      });
    } catch (error) {
      if (error instanceof AuthError) {
        redirect(`${registerPath}?error=generic`);
      }
      throw error;
    }
  }

  async function googleAction() {
    "use server";
    await signIn("google", {
      redirectTo: getPathname({ href: "/dashboard", locale: locale as Locale }),
    });
  }

  return (
    <main className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center px-4 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{t("registerTitle")}</h1>
      <p className="mt-1 text-sm text-muted-foreground">{t("registerSubtitle")}</p>

      {errorCode && (
        <p className="mt-4 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {t(authErrorMessageKey(errorCode))}
        </p>
      )}

      <form action={registerAction} className="mt-6 space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="name">{t("nameLabel")}</Label>
          <Input id="name" name="name" type="text" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">{t("passwordLabel")}</Label>
          <Input id="password" name="password" type="password" required minLength={8} />
        </div>
        <Button type="submit" className="w-full">
          {t("registerCta")}
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
        <div className="h-px flex-1 bg-border" />
        {t("orDivider")}
        <div className="h-px flex-1 bg-border" />
      </div>

      <form action={googleAction} className="mt-6">
        <Button type="submit" variant="outline" className="w-full">
          {t("googleCta")}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        {t("alreadyHaveAccount")}{" "}
        <Link href="/login" className="font-medium text-primary hover:underline">
          {t("loginLink")}
        </Link>
      </p>
    </main>
  );
}
