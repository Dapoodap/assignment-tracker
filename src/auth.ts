// src/auth.ts
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth/authOption";

// Direct export of the NextAuth object
export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);