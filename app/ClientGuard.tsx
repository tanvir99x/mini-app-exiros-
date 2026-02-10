"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function ClientGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/waitlist") return;

    const joined = localStorage.getItem("exiros_waitlist");

    if (joined !== "true") {
      router.replace("/waitlist");
    }
  }, [pathname, router]);

  return <>{children}</>;
}
