"use client";
import React, { useRef, useState } from "react";
import { Camera, Save, User2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProfilePage() {
  // Пример состояния пользователя (замените на данные из контекста/бэка)
  const [avatar, setAvatar] = useState<string | null>(null);
  const [name, setName] = useState("Иван Иванов");
  const [email, setEmail] = useState("ivan@example.com");
  const [editing, setEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatar(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = () => {
    setEditing(false);
    // Здесь можно добавить отправку данных на сервер
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 text-gray-800 flex flex-col items-center py-12">
      <section className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-pink-200 rounded-full opacity-30 blur-2xl pointer-events-none"></div>
        <div className="flex flex-col items-center gap-6">
          <div className="relative group">
            <div
              className="w-32 h-32 rounded-full bg-pink-100 border-4 border-pink-300 shadow-lg flex items-center justify-center overflow-hidden cursor-pointer group-hover:ring-4 group-hover:ring-pink-300 transition"
              onClick={handleAvatarClick}
              title="Изменить аватар"
            >
              {avatar ? (
                <img src={avatar} alt="Аватар" className="w-full h-full object-cover" />
              ) : (
                <User2 className="w-20 h-20 text-pink-400" />
              )}
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAvatarChange}
            />
          </div>
          <form
            className="w-full flex flex-col gap-4 items-center"
            onSubmit={e => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="name" className="text-pink-700 font-semibold">Имя</Label>
              <Input
                id="name"
                value={name}
                disabled={!editing}
                onChange={e => setName(e.target.value)}
                className={`bg-pink-50 transition-all duration-200 ${editing ? "border-pink-400 ring-2 ring-pink-200" : "border-gray-200"}`}
              />
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label htmlFor="email" className="text-pink-700 font-semibold">Email</Label>
              <Input
                id="email"
                value={email}
                disabled={!editing}
                onChange={e => setEmail(e.target.value)}
                className={`bg-pink-50 transition-all duration-200 ${editing ? "border-pink-400 ring-2 ring-pink-200" : "border-gray-200"}`}
              />
            </div>
            <div className="flex gap-4 mt-4">
              {editing ? (
                <Button
                  type="submit"
                  className="bg-pink-600 hover:bg-pink-700 flex items-center gap-2"
                >
                  <Save className="w-5 h-5" /> Сохранить
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="bg-pink-100 text-pink-700 hover:bg-pink-200 border border-pink-300"
                >
                  Редактировать
                </Button>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}