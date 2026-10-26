"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy-900 text-white">
      <p className="text-sm text-navy-200">Redirection vers l'espace de connexion...</p>
    </div>
  );
}
