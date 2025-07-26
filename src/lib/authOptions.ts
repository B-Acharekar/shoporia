import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions } from "next-auth";

const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        return {
          id: "mock-user-id",
          name: credentials?.email?.split("@")[0] || "User",
          email: credentials?.email || "mock@example.com",
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

export default authOptions;
