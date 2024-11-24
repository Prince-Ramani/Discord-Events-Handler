"use client";

import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default async function Page() {
  const searchParams = useSearchParams();
  const intent = searchParams.get("intent");
  return (
    <SignIn
      forceRedirectUrl={intent ? `/dashboard?intent=${intent}` : "/dashboard"}
    />
  );
}
