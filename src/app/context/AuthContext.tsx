// app/context/AuthContext.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  name: string;
  email: string;
  profileImageUrl?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>; // Удален name из параметров, т.к. мы будем брать его из зарегистрированных данных
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const REGISTERED_USERS_KEY = "registeredUsers"; // Ключ для хранения списка зарегистрированных пользователей

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const getRegisteredUsers = (): User[] => {
    const usersJson = localStorage.getItem(REGISTERED_USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  };

  const saveRegisteredUsers = (users: User[]) => {
    localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(users));
  };

  const login = async (email: string): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки

    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find((u) => u.email === email);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      setIsLoading(false);
      router.push("/");
    } else {
      setIsLoading(false);
      // Важно: выбрасываем ошибку, чтобы SignInPage мог ее обработать
      throw new Error("Пользователь с таким email не зарегистрирован.");
    }
  };

  const register = async (name: string, email: string): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Имитация задержки

    const registeredUsers = getRegisteredUsers();
    const existingUser = registeredUsers.find((u) => u.email === email);

    if (existingUser) {
      setIsLoading(false);
      // Важно: выбрасываем ошибку, чтобы RegisterPage мог ее обработать (если нужно)
      // или можно просто не логинить и показать сообщение в RegisterPage
      throw new Error("Пользователь с таким email уже существует.");
    }

    const newUser: User = {
      name,
      email,
      profileImageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=ea80fc&color=fff&font-size=0.45`, // Немного изменил цвета для разнообразия
    };

    const updatedUsers = [...registeredUsers, newUser];
    saveRegisteredUsers(updatedUsers);

    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    setIsLoading(false);
    router.push("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    router.push("/signIn");
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
