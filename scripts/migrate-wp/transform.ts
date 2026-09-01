import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), "data");

function readJson<T>(file: string): T[] {
  const filePath = path.join(DATA_DIR, file);
  if (!fs.existsSync(filePath)) return [];
  const raw = fs.readFileSync(filePath, "utf-8").trim();
  if (!raw || raw === "NULL") return [];
  return JSON.parse(raw) as T[];
}

const HTML_ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#8217;": "’",
  "&#8216;": "‘",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8211;": "–",
  "&#8212;": "—",
};

export function stripHtml(html: string | null | undefined): string | null {
  if (!html) return null;
  let text = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<\/(p|h[1-6]|li|div)>/gi, "\n\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]+>/g, "");
  for (const [entity, char] of Object.entries(HTML_ENTITIES)) {
    text = text.split(entity).join(char);
  }
  text = text.replace(/&#(\d+);/g, (_, code: string) => String.fromCharCode(Number(code)));
  const cleaned = text
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return cleaned || null;
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Prefers a clean English slug; falls back to the raw (often Chinese) title
 * for zh-only content, matching the convention already live in the app. */
function pickSlug(titleEn: string | undefined, titleZh: string | undefined): string {
  if (titleEn) {
    const slug = slugify(titleEn);
    if (slug) return slug;
  }
  return (titleZh ?? titleEn ?? "untitled").trim();
}

function groupByTrid<T extends { trid: number | null }>(rows: T[]): T[][] {
  const groups = new Map<number, T[]>();
  let syntheticKey = -1;
  for (const row of rows) {
    const key = row.trid ?? syntheticKey--;
    const existing = groups.get(key);
    if (existing) existing.push(row);
    else groups.set(key, [row]);
  }
  return Array.from(groups.values());
}

type WpCourseRow = {
  id: number;
  title: string;
  content: string;
  date: string;
  thumbGuid: string | null;
  level: string | null;
  price: string | null;
  salePrice: string | null;
  benefits: string | null;
  trid: number | null;
  lang: string | null;
};

export type TransformedCourse = {
  slug: string;
  titleEn: string | null;
  titleZh: string | null;
  descriptionEn: string | null;
  descriptionZh: string | null;
  whatYoullLearnEn: string | null;
  whatYoullLearnZh: string | null;
  price: number;
  compareAtPrice: number | null;
  level: string | null;
  thumbnailUrl: string | null;
  publishedAt: Date | null;
  sourceWpIds: number[];
};

export function transformCourses(): TransformedCourse[] {
  const rows = readJson<WpCourseRow>("courses.json");
  return groupByTrid(rows).map((group) => {
    const en = group.find((r) => r.lang === "en");
    const zh = group.find((r) => r.lang === "zh-hans");
    const primary = en ?? zh ?? group[0];
    const price = Number(primary.price ?? "0") || 0;
    const salePrice = Number(primary.salePrice ?? "0") || 0;
    return {
      slug: pickSlug(en?.title, zh?.title),
      titleEn: en?.title ?? null,
      titleZh: zh?.title ?? null,
      descriptionEn: stripHtml(en?.content),
      descriptionZh: stripHtml(zh?.content),
      whatYoullLearnEn: en ? stripHtml(en.benefits) : null,
      whatYoullLearnZh: zh ? stripHtml(zh.benefits) : null,
      price: salePrice > 0 ? salePrice : price,
      compareAtPrice: salePrice > 0 && price > salePrice ? price : null,
      level: primary.level,
      thumbnailUrl: primary.thumbGuid,
      publishedAt: primary.date ? new Date(primary.date) : null,
      sourceWpIds: group.map((r) => r.id),
    };
  });
}

type WpBlogRow = {
  id: number;
  title: string;
  content: string;
  excerpt: string | null;
  date: string;
  author: string | null;
  thumbGuid: string | null;
  trid: number | null;
  lang: string | null;
};

export type TransformedBlogPost = {
  slug: string;
  titleEn: string | null;
  titleZh: string | null;
  contentEn: string | null;
  contentZh: string | null;
  coverImageUrl: string | null;
  author: string | null;
  publishedAt: Date | null;
  sourceWpIds: number[];
};

export function transformBlogPosts(): TransformedBlogPost[] {
  const rows = readJson<WpBlogRow>("blogs.json");
  return groupByTrid(rows).map((group) => {
    const en = group.find((r) => r.lang === "en");
    const zh = group.find((r) => r.lang === "zh-hans");
    const primary = en ?? zh ?? group[0];
    return {
      slug: pickSlug(en?.title, zh?.title),
      titleEn: en?.title ?? null,
      titleZh: zh?.title ?? null,
      contentEn: stripHtml(en?.content),
      contentZh: stripHtml(zh?.content),
      coverImageUrl: primary.thumbGuid,
      author: primary.author,
      publishedAt: primary.date ? new Date(primary.date) : null,
      sourceWpIds: group.map((r) => r.id),
    };
  });
}

type WpUserRow = {
  id: number;
  login: string;
  email: string;
  passHash: string;
  displayName: string | null;
  registered: string;
  roles: string | null;
};

export type TransformedUser = {
  email: string;
  name: string | null;
  passwordHash: string;
  role: "ADMIN" | "GUEST";
  registeredAt: Date;
  sourceWpId: number;
  sourceWpLogin: string;
};

export function transformUsers(): TransformedUser[] {
  const rows = readJson<WpUserRow>("users.json");
  return rows.map((row) => ({
    email: row.email.trim().toLowerCase(),
    name: row.displayName ?? null,
    passwordHash: row.passHash,
    role: row.roles?.includes("administrator") ? "ADMIN" : "GUEST",
    registeredAt: new Date(row.registered),
    sourceWpId: row.id,
    sourceWpLogin: row.login,
  }));
}

type WpMembershipLevelRow = { id: number; name: string; initial: string; billing: string; cycle_number: number; cycle_period: string };
type WpMembershipUserRow = { id: number; userId: number; userEmail: string | null; membershipId: number; status: string; startdate: string; enddate: string | null };
type WpMembershipOrderRow = { id: number; userId: number; userEmail: string | null; membershipId: number; total: string; status: string; timestamp: string };
type WpTutorOrderRow = { id: number; userId: number; userEmail: string | null; orderStatus: string; paymentStatus: string; totalPrice: string; couponCode: string | null; createdAt: string };
type WpTutorOrderItemRow = { id: number; orderId: number; courseId: number; regularPrice: string };

export function transformMembershipLevels() {
  return readJson<WpMembershipLevelRow>("membership_levels.json");
}
export function transformMembershipsUsers() {
  return readJson<WpMembershipUserRow>("memberships_users.json");
}
export function transformMembershipOrders() {
  return readJson<WpMembershipOrderRow>("membership_orders.json");
}
export function transformTutorOrders() {
  return readJson<WpTutorOrderRow>("tutor_orders.json");
}
export function transformTutorOrderItems() {
  return readJson<WpTutorOrderItemRow>("tutor_order_items.json");
}
