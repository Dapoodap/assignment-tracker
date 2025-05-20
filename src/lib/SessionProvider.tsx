"use client";
import { SessionProvider } from "next-auth/react";
import React from "react";
import type { Session } from "next-auth";


export const SessionWrapper = ({
  session,
  children,
}: {
  session: Session | null;
  children: React.ReactNode;
}) => {
  return (
    <SessionProvider session={session} basePath="/api/auth">
      {children}
    </SessionProvider>
  );
};
