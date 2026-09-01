import { partners } from "@/lib/mock-data";

export function PartnersGrid() {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-5">
      {partners.map((partner) => {
        const content = (
          <div className="flex h-24 items-center justify-center rounded-lg border bg-background px-4 text-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-foreground">
            {partner.name}
          </div>
        );

        return partner.linkUrl ? (
          <a
            key={partner.name}
            href={partner.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            {content}
          </a>
        ) : (
          <div key={partner.name} className="group">
            {content}
          </div>
        );
      })}
    </div>
  );
}
