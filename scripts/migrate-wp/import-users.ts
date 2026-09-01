/**
 * Imports users + membership subscriptions + course enrollments from the WP
 * export into Postgres. Deliberately NOT run for real yet — see
 * docs/20260901-nextjs-rebuild-tasks.md U7: the site currently has 0 real
 * paying members/orders (the 4 WP accounts today are admin + two Tutor LMS
 * demo accounts + one spam signup), so this should be re-run right before
 * the U9 domain cutover to capture whatever real signups exist by then.
 *
 * Password strategy: WordPress password hashes (phpass or WP 6.8's
 * $wp$-prefixed bcrypt) are stored as-is in passwordHash for audit purposes,
 * but bcryptjs can't verify them, so needsReset is always set true --
 * migrated accounts must go through a "forgot password" flow before their
 * first login (that flow isn't built yet, tracked separately).
 *
 * Usage:
 *   npx tsx scripts/migrate-wp/import-users.ts            # dry run (prints only)
 *   npx tsx scripts/migrate-wp/import-users.ts --commit    # writes to Postgres
 */
import "dotenv/config";
import { prisma } from "../../src/lib/db/prisma";
import {
  transformCourses,
  transformMembershipOrders,
  transformMembershipsUsers,
  transformTutorOrderItems,
  transformTutorOrders,
  transformUsers,
} from "./transform";

const isCommit = process.argv.includes("--commit");

function guessTier(membershipLevelId: number): "NORMAL" | "VIP" {
  // WP membership_levels table is currently empty on this site, so there's
  // no level name to key off yet. Default to NORMAL; revisit once real
  // levels exist (see membership_levels.json from export-wp.sh).
  return membershipLevelId > 0 ? "NORMAL" : "NORMAL";
}

async function main() {
  const users = transformUsers();
  const memberships = transformMembershipsUsers();
  const membershipOrders = transformMembershipOrders();
  const tutorOrders = transformTutorOrders();
  const tutorOrderItems = transformTutorOrderItems();
  const courses = transformCourses();

  console.log(`Users to import: ${users.length}`);
  for (const u of users) {
    console.log(`  - ${u.email} (wp login "${u.sourceWpLogin}") role=${u.role} registered=${u.registeredAt.toISOString().slice(0, 10)}`);
  }

  console.log(`\nMembership subscriptions to import: ${memberships.length}`);
  console.log(`Membership orders on file (reference only): ${membershipOrders.length}`);
  console.log(`Tutor orders to import as enrollments: ${tutorOrders.length} (${tutorOrderItems.length} line items)`);

  if (!isCommit) {
    console.log("\nDry run only — no changes written. Re-run with --commit to import.");
    console.log(
      "Reminder: only run --commit right before the U9 domain cutover, so it captures the freshest real signups.",
    );
    return;
  }

  const wpIdToSlug = new Map<number, string>();
  for (const c of courses) {
    for (const wpId of c.sourceWpIds) wpIdToSlug.set(wpId, c.slug);
  }

  const emailToUserId = new Map<string, string>();
  for (const u of users) {
    const created = await prisma.user.upsert({
      where: { email: u.email },
      create: {
        email: u.email,
        name: u.name,
        passwordHash: u.passwordHash,
        needsReset: true,
        role: u.role,
      },
      update: {
        name: u.name,
        role: u.role,
      },
    });
    emailToUserId.set(u.email, created.id);
  }

  let subscriptionsCreated = 0;
  for (const m of memberships) {
    const userId = m.userEmail ? emailToUserId.get(m.userEmail.trim().toLowerCase()) : undefined;
    if (!userId) continue;
    await prisma.membershipSubscription.create({
      data: {
        userId,
        tier: guessTier(m.membershipId),
        status: m.status,
        startedAt: new Date(m.startdate),
        expiresAt: m.enddate ? new Date(m.enddate) : null,
      },
    });
    subscriptionsCreated += 1;
  }

  let enrollmentsCreated = 0;
  const orderIdToUserId = new Map<number, string>();
  for (const o of tutorOrders) {
    const userId = o.userEmail ? emailToUserId.get(o.userEmail.trim().toLowerCase()) : undefined;
    if (userId) orderIdToUserId.set(o.id, userId);
  }
  for (const item of tutorOrderItems) {
    const userId = orderIdToUserId.get(item.orderId);
    const slug = wpIdToSlug.get(item.courseId);
    if (!userId || !slug) continue;
    const course = await prisma.course.findUnique({ where: { slug } });
    if (!course) continue;
    await prisma.enrollment.create({
      data: {
        userId,
        courseId: course.id,
        status: "enrolled",
        purchasedAt: new Date(),
      },
    });
    enrollmentsCreated += 1;
  }

  console.log(
    `\nImported ${users.length} users, ${subscriptionsCreated} membership subscriptions, ${enrollmentsCreated} enrollments.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
