import Image from "next/image";
import { useTranslations } from "next-intl";
import { partners } from "@/lib/mock-data";

export function PartnersGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
      {partners.map((partner) => {
        const content = (
          <div className="flex h-24 items-center justify-center rounded-lg border bg-background p-4">
            <Image
              src={partner.logo}
              alt={partner.name}
              width={160}
              height={80}
              className="h-full w-auto object-contain"
            />
          </div>
        );

        return partner.linkUrl ? (
          <a
            key={partner.name}
            href={partner.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={partner.name}
          >
            {content}
          </a>
        ) : (
          <div key={partner.name} aria-label={partner.name}>
            {content}
          </div>
        );
      })}
    </div>
  );
}

export function PartnersContact() {
  const t = useTranslations("Partners");

  return (
    <div className="mt-10 rounded-xl bg-sky-500 px-6 py-10 text-center text-white">
      <h3 className="text-xl font-semibold lg:text-3xl">{t("contactTitle")}</h3>
      <div className="mt-6 flex flex-col items-center justify-center gap-6 sm:flex-row">
        <a
          href="https://www.xiaohongshu.com/user/profile/61df1c740000000010005686"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-white/15 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/25"
        >
          <Image
            src="/migrated/partners/rednote-qr.png"
            alt="Rednote QR code"
            width={40}
            height={40}
            className="rounded"
          />
          {t("connectRednote")}
        </a>
        <a
          href="https://weixin.qq.com/r/QRG_ptbE6YuWrZLF90RT"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 rounded-full bg-white/15 px-5 py-2 text-sm font-medium transition-colors hover:bg-white/25"
        >
          <Image
            src="/migrated/partners/wechat-qr.png"
            alt="WeChat QR code"
            width={40}
            height={40}
            className="rounded"
          />
          {t("connectWechat")}
        </a>
      </div>
    </div>
  );
}
