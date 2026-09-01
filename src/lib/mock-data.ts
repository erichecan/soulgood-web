// Courses and blog posts used to live here as manually-scraped mock data;
// U7 migrated the real WordPress content into Postgres (see
// scripts/migrate-wp/) and the public pages now read from there via
// src/lib/db/{courses,blogs}.ts. Partners aren't migrated yet — still real
// content captured 2026-09-01, just not database-backed.

export type MockPartner = {
  name: string;
  logo: string;
  linkUrl: string | null;
};

export const partners: MockPartner[] = [
  { name: "Pioneer Group", logo: "/migrated/partners/pioneer-group-logo.svg", linkUrl: "https://pioneergroups.ca/" },
  {
    name: "Soul Beauty Healing Center",
    logo: "/migrated/partners/soulbeauty-logo.svg",
    linkUrl: "https://www.soulbeautyhealing.ca/",
  },
  { name: "Pioneer HR Solutions", logo: "/migrated/partners/hr-solutions-logo.svg", linkUrl: null },
  {
    name: "University of Waterloo",
    logo: "/migrated/partners/waterloo-logo.svg",
    linkUrl: "https://uwaterloo.ca/",
  },
  { name: "BMO", logo: "/migrated/partners/bmo-logo.svg", linkUrl: "https://www.bmo.com/" },
];
