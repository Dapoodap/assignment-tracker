// lib/auth/authOption.ts
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      // In NextAuth v5, the 'credentials' ID is automatic and shouldn't be explicitly set
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        try {
          const email = credentials.email as string;
          
          const user = await prisma.user.findUnique({
            where: { email  },
          });

          if (!user || !user.password) {
            throw new Error("No user found or password not set");
          }

          const isValid = await bcrypt.compare(credentials.password as string, user.password);
          if (!isValid) {
            throw new Error("Invalid password");
          }

          // Return only what you want to store in the token
          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          console.error("Auth error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // You can add other custom pages here
    // signOut: "/logout",
    // error: "/auth/error",
  },
  callbacks: {
    // These are already handled automatically in NextAuth v5
    // so we can simplify these callbacks
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  trustHost: true, // Required for production deployment on Vercel
  debug: process.env.NODE_ENV === "development",
};