// app/signIn/page.tsx
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link"; // Для ссылки "Зарегистрироваться"
import { useAuth } from "../context/AuthContext";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Пароль пока не используется в логике login, но оставим
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth(); // Используем login и isLoading из контекста

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError(null); // Сбрасываем предыдущие ошибки
    if (!email.trim() || !password.trim()) {
      // Простая проверка на заполненность
      setError("Введите email и пароль");
      return;
    }
    try {
      // В нашей имитации login, имя пользователя будет "Пользователь", если не передано
      await login(email);
      // Перенаправление произойдет внутри функции login в AuthContext
    } catch (err) {
      // Обработка ошибок от функции login, если она их выбрасывает
      console.error("Ошибка входа:", err);
      setError("Ошибка входа. Проверьте данные или попробуйте позже.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="bgSquares">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="square"></div>
          ))}
        </div>
      </div>
      <Card className="relative z-10 w-full max-w-md shadow-[0px_0px_50px_10px_rgba(219,39,119,0.2)] border-pink-200">
        <CardHeader>
          <CardTitle className="text-center font-bold text-4xl text-pink-700 drop-shadow">
            Вход
          </CardTitle>
          <CardDescription className="text-center">
            Войдите в свой аккаунт, чтобы продолжить
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={handleSignIn}
            className="w-full bg-pink-600 hover:bg-pink-700 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Вход..." : "Войти"}
          </Button>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
          <span className="text-sm text-center text-gray-500">
            Нет аккаунта?{" "}
            <Link href="/register" className="text-pink-600 hover:underline">
              Зарегистрироваться
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
