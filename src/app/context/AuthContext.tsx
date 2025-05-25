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
  id: string;
  name: string;
  email: string;
  profileImageUrl?: string | null;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  register: (name: string, email: string) => Promise<void>;
  logout: () => void;
  updateUser: (
    userId: string,
    updatedData: Partial<Omit<User, "id" | "email">> // email shouldn't be updatable this way
  ) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const REGISTERED_USERS_KEY = "registeredUsers";
const CURRENT_USER_KEY = "currentUser";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
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
    await new Promise((resolve) => setTimeout(resolve, 300));
    const registeredUsers = getRegisteredUsers();
    const foundUser = registeredUsers.find((u) => u.email === email);

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser));
      router.push("/");
    } else {
      setIsLoading(false); // Make sure to set loading false on error
      throw new Error("Пользователь с таким email не зарегистрирован.");
    }
    setIsLoading(false);
  };

  const register = async (name: string, email: string): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));
    const registeredUsers = getRegisteredUsers();
    if (registeredUsers.find((u) => u.email === email)) {
      setIsLoading(false);
      throw new Error("Пользователь с таким email уже существует.");
    }
    const newUser: User = {
      id: Date.now().toString() + Math.random().toString(36).slice(2, 7),
      name,
      email,
      profileImageUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
      )}&background=ec4899&color=fff&length=2&font-size=0.45&bold=true`, // Pink background
    };
    saveRegisteredUsers([...registeredUsers, newUser]);
    setUser(newUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
    router.push("/");
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    router.push("/signIn");
  };

  const updateUser = async (
    userId: string,
    updatedData: Partial<Omit<User, "id" | "email">>
  ): Promise<void> => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    let currentUserState = user;
    if (!currentUserState || currentUserState.id !== userId) {
      const storedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (storedUser) currentUserState = JSON.parse(storedUser);
    }

    if (!currentUserState || currentUserState.id !== userId) {
      setIsLoading(false);
      throw new Error(
        "Пользователь для обновления не найден или ID не совпадает."
      );
    }

    const updatedUserObject: User = { ...currentUserState, ...updatedData };

    // If name changed and no new profileImageUrl is provided,
    // and the old one was a ui-avatar, regenerate it.
    if (
      updatedData.name &&
      !updatedData.profileImageUrl &&
      currentUserState.profileImageUrl?.startsWith("https://ui-avatars.com")
    ) {
      updatedUserObject.profileImageUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        updatedUserObject.name
      )}&background=ec4899&color=fff&length=2&font-size=0.45&bold=true`;
    }

    setUser(updatedUserObject);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUserObject));

    const registeredUsers = getRegisteredUsers();
    const userIndex = registeredUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      registeredUsers[userIndex] = updatedUserObject;
      saveRegisteredUsers(registeredUsers);
    }
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, register, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
