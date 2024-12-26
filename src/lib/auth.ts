// @ts-nocheck
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { doesUserExist, createUserOnGoogleLogin, getUserByEmail } from "./data_queries";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        if (await doesUserExist(user.email)) {
          return true;
        } else {
          await createUserOnGoogleLogin(user);
          return true;
        }
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const existing_user = await getUserByEmail(session.user.email);
      session.user.userId = existing_user?.id;
      session.user.role = existing_user.role;
      return session;
    },

  }
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
