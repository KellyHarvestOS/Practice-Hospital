// app/register/page.tsx
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
import Link from "next/link";
import { useAuth } from "../context/AuthContext";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  passrepeat: string;
}

const RegisterPage = () => {
  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
    passrepeat: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { register, isLoading } = useAuth();

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name.trim()) newErrors.name = "Введите имя";
    if (!form.email.trim()) {
      newErrors.email = "Введите электронную почту";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Некорректный формат электронной почты";
    }
    if (!form.password) {
      newErrors.password = "Введите пароль";
    } else if (form.password.length < 6) {
      newErrors.password = "Пароль должен быть не менее 6 символов";
    }
    if (form.password !== form.passrepeat) {
      newErrors.passrepeat = "Пароли не совпадают";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    setErrors({}); // Сброс предыдущих общих ошибок
    try {
      await register(form.name, form.email);
      // Перенаправление произойдет внутри функции register в AuthContext
      // Очистка полей не нужна, т.к. будет перенаправление
    } catch (error: any) {
      // Ловим ошибки от AuthContext
      console.error("Ошибка регистрации:", error);
      setErrors({
        general: error.message || "Ошибка регистрации. Попробуйте позже.",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {/* Можно добавить фоновые анимации/элементы, если есть */}
        {/* <div className="bgSquares">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="square"></div>
          ))}
        </div> */}
      </div>
      <Card className="relative z-10 w-full max-w-md shadow-[0px_0px_50px_10px_rgba(219,39,119,0.2)] border-pink-200">
        <CardHeader>
          <CardTitle className="text-center font-bold text-4xl text-pink-700 drop-shadow">
            Регистрация
          </CardTitle>
          <CardDescription className="text-center">
            Создайте учетную запись, чтобы получить доступ ко всем функциям
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Ваше имя"
              disabled={isLoading}
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              type="email"
              placeholder="you@example.com"
              disabled={isLoading}
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.password && (
              <p className="text-xs text-red-500 mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <Label htmlFor="password-repeat">Повтор пароля</Label>
            <Input
              id="password-repeat"
              value={form.passrepeat}
              onChange={(e) => setForm({ ...form, passrepeat: e.target.value })}
              type="password"
              placeholder="••••••••"
              disabled={isLoading}
            />
            {errors.passrepeat && (
              <p className="text-xs text-red-500 mt-1">{errors.passrepeat}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {errors.general && (
            <p className="text-sm text-center text-red-500 mb-2">
              {errors.general}
            </p>
          )}
          <Button
            onClick={handleRegister}
            className="w-full bg-pink-600 hover:bg-pink-700 text-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
          <span className="text-sm text-center text-gray-500">
            Уже есть аккаунт?{" "}
            <Link href="/signIn" className="text-pink-600 hover:underline">
              Войти
            </Link>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
};
export default RegisterPage;
