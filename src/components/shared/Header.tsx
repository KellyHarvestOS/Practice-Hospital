  'use client';

  import Link from "next/link";
  import { Button } from "@/components/ui/button";
  import { motion } from "framer-motion";
   
  const Header = () => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-pink-500 text-white py-6 px-4 shadow-md sticky top-0 z-50"
    >
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold hover:text-pink-100 transition-colors">
          HealthCare+ Hospital
        </Link>

        <div className="flex gap-3 " >
          {[
            { href: "/", label: "Главная" },
            { href: "/contact", label: "Контакты" },
            { href: "/about", label: "О нас" },
            { href: "/signIn", label: "Вход" },
            { href: "/register", label: "Регистрация" },
          ].map(({ href, label }) => (
            <motion.div
              key={label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}
              
            >
              <Link href={href}>
                <Button variant="secondary" className="bg-pink-100" >{label}</Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.header>
  )
}
 export default Header;