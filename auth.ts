import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { db } from "@/lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({}),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/agency/sign-in",
    error: "/auth/error",
  },
  callbacks: {
    jwt: async ({ token, user, trigger, session }) => {
      // If the user is signing in for the first time, or there's an existing user
      if (trigger === "update") {
        return {
          ...token,
          ...session.user,
        };
      }
      if (user) {
        const email = user.email;
        let alreadyUser;

        if (email) {
          alreadyUser = await db.user.findUnique({
            where: { email: email },
          });
        }

        // If user exists, populate the token with user info
        if (alreadyUser) {
          token.id = alreadyUser.id;
          token.name = alreadyUser.name;
          token.role = alreadyUser.role; // Assign user's role
        }
      }
      return token; // Return the updated token
    },
    session: async ({ session, token }) => {
      if (token.id && session.user) {
        // @ts-ignore: Ignore type error for role
        session.user.id = token.id;
        // @ts-ignore: Ignore type error for role
        session.user.name = token.name;
        // @ts-ignore: Ignore type error for role
        session.user.role = token.role;
      }
      return session;
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === "google") {
        const { email, name, image } = user;

        if (email && name && image) {
          const alreadyUser = await db.user.findUnique({
            where: { email },
            select: {
              email: true,
            },
          });
          if (alreadyUser) {
            return true;
          } else if (!alreadyUser) {
            await db.user.create({
              data: {
                email,
                name: name,
                avatarUrl: image,
              },
            });
          }
          return true;
        } else return false;
      }

      return true;
    },
  },
  session: {
    strategy: "jwt",
  },
});
