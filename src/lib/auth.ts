import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { prisma } from "@/lib/db/prisma";
import { createGoogleUser, findUserByEmail, linkGoogleAccount, verifyPassword } from "@/lib/db/users";
import type { Role } from "@/generated/prisma/enums";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email;
        const password = credentials?.password;
        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const user = await findUserByEmail(email);
        if (!user) return null;

        const isValid = await verifyPassword(user, password);
        if (!isValid) return null;

        return { id: user.id, email: user.email, name: user.name };
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "google") return true;

      const email = user.email;
      if (!email) return false;

      const existing = await findUserByEmail(email);
      if (existing) {
        if (!existing.googleId && account.providerAccountId) {
          await linkGoogleAccount(existing.id, account.providerAccountId);
        }
      } else if (account.providerAccountId) {
        await createGoogleUser({
          email,
          name: user.name ?? null,
          googleId: account.providerAccountId,
        });
      }

      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
        if (dbUser) {
          return { ...token, userId: dbUser.id, role: dbUser.role };
        }
      }
      return token;
    },
    async session({ session, token }) {
      const userId = token.userId as string | undefined;
      const role = token.role as Role | undefined;
      if (session.user && userId && role) {
        session.user.id = userId;
        session.user.role = role;
      }
      return session;
    },
  },
});
