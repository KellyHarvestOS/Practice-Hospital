"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-pink-600 dark:bg-gray-950 text-white dark:text-yellow-200 py-4 px-4 shadow-lg sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-bold hover:text-pink-100 dark:hover:text-yellow-300 transition-colors"
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
                  className="bg-pink-100 dark:bg-gray-800 text-pink-700 dark:text-yellow-200 hover:bg-pink-200 dark:hover:bg-gray-700 shadow transition-colors"
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
                className="flex items-center gap-3 cursor-pointer p-1 rounded-md hover:bg-pink-500 dark:hover:bg-gray-800 transition-colors"
                onClick={() => router.push("/profile")}
              >
                {user.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt={user.name || "Профиль"}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-pink-100 dark:border-yellow-200 shadow-lg object-cover"
                    key={user.profileImageUrl}
                  />
                ) : (
                  <div className="w-10 h-10 bg-pink-200 dark:bg-gray-700 rounded-full flex items-center justify-center text-pink-700 dark:text-yellow-200 font-bold text-lg border-2 border-pink-100 dark:border-yellow-200 shadow-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                  </div>
                )}
                <span className="text-sm font-medium hidden sm:inline">
                  {user.name}
                </span>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={logout}
                  variant="destructive"
                  className="bg-pink-700 dark:bg-yellow-700 hover:bg-pink-800 dark:hover:bg-yellow-800 border border-pink-100 dark:border-yellow-200 hover:border-pink-200 dark:hover:border-yellow-300 text-white dark:text-gray-900 shadow transition-colors"
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
                    className="bg-pink-100 dark:bg-gray-800 text-pink-700 dark:text-yellow-200 hover:bg-pink-200 dark:hover:bg-gray-700 shadow transition-colors"
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
                    className="bg-pink-500 dark:bg-yellow-700 hover:bg-pink-700 dark:hover:bg-yellow-800 text-white dark:text-gray-900 shadow transition-colors"
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