// app/context/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation"; // Используем из next/navigation

interface User {
  name: string;
  email: string;
  // Можно добавить imageUrl для фото профиля
  profileImageUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, name?: string) => Promise<void>; // name опционален для логина
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Начальная загрузка для проверки localStorage
  const router = useRouter();

  useEffect(() => {
    // При загрузке компонента проверяем localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false); // Завершаем начальную загрузку
  }, []);

  const login = async (email: string, name?: string): Promise<void> => {
    setIsLoading(true);
    // Имитация API запроса
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userData: User = {
      email,
      name: name || "Пользователь",
      profileImageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name || email
      )}&background=random&color=fff`,
    };
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setIsLoading(false);
    router.push("/"); // Перенаправляем на главную после логина
  };

  const register = async (name: string, email: string): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const userData: User = {
      name,
      email,
      profileImageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=random&color=fff`,
    };
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
    setIsLoading(false);
    router.push("/"); // Перенаправляем на главную после регистрации
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    router.push("/signIn"); // Перенаправляем на страницу входа
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
