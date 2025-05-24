// app/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";

const Header = () => {
  const { user, logout, isLoading } = useAuth();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-pink-500 text-white py-4 px-4 shadow-md sticky top-0 z-50" // Уменьшил py для компактности
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-pink-100 transition-colors"
        >
          HealthCare+ Hospital
        </Link>

        <nav className="flex gap-3 items-center">
          {[
            { href: "/", label: "Главная" },
            { href: "/contact", label: "Контакты" },
            { href: "/about", label: "О нас" },
          ].map(({ href, label }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Link href={href}>
                <Button
                  variant="secondary"
                  className="bg-pink-100 text-pink-700 hover:bg-pink-200"
                >
                  {label}
                </Button>
              </Link>
            </motion.div>
          ))}

          {isLoading ? (
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : user ? (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2"
              >
                {user.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt={user.name || "Профиль"}
                    width={36}
                    height={36}
                    className="rounded-full border-2 border-pink-100"
                  />
                ) : (
                  <div className="w-9 h-9 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 font-semibold">
                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
                <span className="text-sm hidden sm:inline">{user.name}</span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={logout}
                  variant="destructive"
                  className="bg-pink-600 hover:bg-pink-700 border border-pink-100 hover:border-pink-200"
                >
                  Выход
                </Button>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/signIn">
                  <Button
                    variant="secondary"
                    className="bg-pink-100 text-pink-700 hover:bg-pink-200"
                  >
                    Вход
                  </Button>
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link href="/register">
                  <Button
                    variant="default"
                    className="bg-pink-600 hover:bg-pink-700"
                  >
                    Регистрация
                  </Button>
                </Link>
              </motion.div>
            </>
          )}
        </nav>
      </div>
    </motion.header>
  );
};
export default Header;
