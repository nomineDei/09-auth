"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function SignUpLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, [router]);
  return <div>{children}</div>;
}
