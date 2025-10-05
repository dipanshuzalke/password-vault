"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isAuthPage = pathname.includes("login") || pathname.includes("signup");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  }

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b backdrop-blur-md bg-white/70 dark:bg-zinc-900/70 sticky top-0 z-50 transition-all">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 bg-black rounded-full" />
        <span className="text-lg font-semibold tracking-tight">VaultX</span>
      </div>

      {/* Navigation buttons */}
      {!isAuthPage && (
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="text-gray-700 hover:text-black text-sm transition">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-black text-white px-4 py-1.5 rounded-full text-sm hover:bg-gray-800 transition">
                  Signup
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
