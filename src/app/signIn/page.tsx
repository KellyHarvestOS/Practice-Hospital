import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-pink-100 relative overflow-hidden">
      {/* Декоративные квадраты */}
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
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full bg-pink-600 hover:bg-pink-700 text-lg font-semibold">
            Войти
          </Button>
          <span className="text-sm text-center text-gray-500">
            Нет аккаунта? <a href="/register" className="text-pink-600 hover:underline">Зарегистрироваться</a>
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}