// app/components/Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useAuth } from "@/app/context/AuthContext";
// import { UserCircle } from "lucide-react"; // Раскомментируйте, если хотите использовать иконку

const Header = () => {
  const { user, logout, isLoading } = useAuth();
  // const router = useRouter(); // Раскомментируйте, если нужен router, например, для перехода на профиль

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-pink-500 text-white py-4 px-4 shadow-md sticky top-0 z-50"
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
                className="flex items-center gap-3 cursor-pointer"
                // onClick={() => router.push('/profile')} // Пример: переход на страницу профиля
              >
                {user.profileImageUrl ? (
                  <Image
                    src={user.profileImageUrl}
                    alt={user.name || "Профиль"}
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-pink-100 shadow-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center text-pink-700 font-bold text-lg border-2 border-pink-100 shadow-lg">
                    {user.name ? user.name.charAt(0).toUpperCase() : "?"}
                    {/* Или иконка: <UserCircle size={24} className="text-pink-700" /> */}
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
