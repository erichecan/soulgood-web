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

const contactChannels = [
  {
    key: "rednote",
    labelKey: "connectRednote",
    qrSrc: "/migrated/partners/rednote-qr.png",
    href: "https://www.xiaohongshu.com/user/profile/61df1c740000000010005686",
  },
  {
    key: "wechat",
    labelKey: "connectWechat",
    qrSrc: "/migrated/partners/wechat-qr.png",
    href: "https://weixin.qq.com/r/QRG_ptbE6YuWrZLF90RT",
  },
  {
    key: "facebook",
    labelKey: "connectFacebook",
    qrSrc: "/migrated/partners/facebook-qr.png",
    href: undefined,
  },
  {
    key: "instagram",
    labelKey: "connectInstagram",
    qrSrc: "/migrated/partners/instagram-qr.png",
    href: undefined,
  },
  {
    key: "tiktok",
    labelKey: "connectTiktok",
    qrSrc: "/migrated/partners/tiktok-qr.png",
    href: undefined,
  },
] as const;

export function PartnersContact() {
  const t = useTranslations("Partners");

  return (
    <div className="mt-10 rounded-xl bg-sky-500 px-6 py-10 text-center text-white">
      <h3 className="text-xl font-semibold lg:text-3xl">{t("contactTitle")}</h3>
      <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
        {contactChannels.map((channel) => {
          const content = (
            <div className="flex flex-col items-center gap-3 rounded-lg bg-white/15 px-4 py-5 transition-colors hover:bg-white/25">
              <Image
                src={channel.qrSrc}
                alt={`${t(channel.labelKey)} QR code`}
                width={96}
                height={96}
                className="h-24 w-24 rounded bg-white p-1"
              />
              <span className="text-sm font-medium">{t(channel.labelKey)}</span>
            </div>
          );

          return channel.href ? (
            <a key={channel.key} href={channel.href} target="_blank" rel="noopener noreferrer">
              {content}
            </a>
          ) : (
            <div key={channel.key}>{content}</div>
          );
        })}
      </div>
    </div>
  );
}
