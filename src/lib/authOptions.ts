import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import bcrypt from "bcryptjs";
// Rename your DB model import to avoid name conflict
import DbUser from "@/models/User";
import type { AuthOptions, User } from "next-auth"; // <-- this is the type!

import { connectDB } from "./mongodb";

const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();

        if (!credentials?.email || !credentials.password) return null;

        const user = await DbUser.findOne({ email: credentials.email });
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(credentials.password, user.password || "");
        if (!isPasswordValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async redirect({ baseUrl }) {
      // Always go to /shop after login
      return `${baseUrl}/shop`;
    },
    async signIn({ user }) {
      await connectDB();
      const exisitingUser = await DbUser.findOne({ email: user.email });
      if (!exisitingUser) {
        await DbUser.create({
          name: user.name,
          email: user.email,
          image: user.image,
          role: "user",
        });
      }
      return true;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.role = user.role ?? "user";
      }
      return token;
    },
    async session({ session, token }) {
      await connectDB();
      const dbUser = await DbUser.findOne({ email: session.user?.email });
      if (session.user) {
        session.user.role = dbUser?.role || token.role || "user";
        session.user.id = dbUser?._id?.toString();
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions;
