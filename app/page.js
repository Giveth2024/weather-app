'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-5xl md:text-7xl font-bold text-white animate-pulse tracking-widest">
        Loading...
      </h1>
    </div>
  );
}
