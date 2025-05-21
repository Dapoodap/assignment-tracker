// utils/api-auth.ts
import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Get the current session user in an API route handler
 * @returns The session user or throws an unauthorized response
 */
export async function getSessionUser() {
  const session = await auth();

  if (!session?.user) {
    throw new NextResponse(
      JSON.stringify({ error: "Unauthorized: Authentication required" }),
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }

  return session.user;
}