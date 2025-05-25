// app/profile/page.tsx
"use client";

import { useState, useEffect, ChangeEvent, FormEvent, useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Camera,
  Edit2,
  Save,
  UserCircle,
  XCircle,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProfilePage = () => {
  const { user, updateUser, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedImageFile, setEditedImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Лог при каждом рендере компонента
  // console.log("ProfilePage RENDER. isEditing:", isEditing, "successMessage:", successMessage, "user:", user);

  useEffect(() => {
    // console.log("useEffect [user, authLoading] run. AuthLoading:", authLoading, "User:", user);
    if (!authLoading && !user) {
      router.push("/signIn");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user) {
      if (!isEditing) {
        // Только если НЕ В РЕЖИМЕ РЕДАКТИРОВАНИЯ, обновляем из user
        setEditedName(user.name);
        setImagePreview(user.profileImageUrl || null);
        setEditedImageFile(null); // Сбрасываем файл, если вышли из редактирования
      }
    }
  }, [user, isEditing]); // Добавляем isEditing, чтобы сбрасывать при выходе из режима ред.

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setEditedImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    // console.log("handleEditToggle CALLED. Current isEditing (before update):", isEditing, "Current successMessage:", successMessage);
    const nextIsEditing = !isEditing;
    setIsEditing(nextIsEditing);
    setError(null);
    setSuccessMessage(null);

    if (user && nextIsEditing) {
      // Если ПЕРЕХОДИМ в режим редактирования
      // console.log("Transitioning TO edit mode, pre-filling form with current user data.");
      setEditedName(user.name);
      setImagePreview(user.profileImageUrl || null);
      setEditedImageFile(null);
    }
    // console.log("handleEditToggle FINISHED. New isEditing should be:", nextIsEditing);
  };

  // Теперь handleSubmit не принимает event, т.к. вызывается напрямую
  const handleSubmit = async () => {
    if (!user) return;

    // console.log("handleSubmit CALLED");
    setIsUpdating(true);
    setError(null);
    setSuccessMessage(null);

    const updatedData: { name?: string; profileImageUrl?: string } = {};

    let hasChanges = false;
    if (editedName !== user.name) {
      updatedData.name = editedName;
      hasChanges = true;
    }

    if (editedImageFile) {
      // Если выбран новый файл
      updatedData.profileImageUrl = imagePreview as string; // imagePreview уже содержит DataURL нового файла
      hasChanges = true;
    }

    if (!hasChanges) {
      // console.log("No changes to submit.");
      setIsUpdating(false);
      setIsEditing(false); // Выходим из режима редактирования, если не было изменений
      setSuccessMessage("Изменений не было.");
      return;
    }

    try {
      await updateUser(user.id, updatedData);
      setSuccessMessage("Профиль успешно обновлен!");
      // console.log("Profile updated successfully. Setting isEditing to false.");
      setIsEditing(false); // Выходим из режима редактирования после успешного сохранения
      setEditedImageFile(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Не удалось обновить профиль."
      );
      console.error("Error updating profile:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] bg-pink-50">
        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const currentAvatar =
    imagePreview ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user.name
    )}&background=ec4899&color=fff&length=2&font-size=0.45&bold=true`;

  return (
    <div className="min-h-[calc(100vh-150px)] bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 py-12 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-pink-700 mb-8 text-center">
          Мой Профиль
        </h1>
        {error && (
          <motion.div
            /* ... */ className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-md flex items-center"
          >
            <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />{" "}
            <span>{error}</span>
          </motion.div>
        )}
        {successMessage && (
          <motion.div
            /* ... */ className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md flex items-center"
          >
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />{" "}
            <span>{successMessage}</span>
          </motion.div>
        )}
        {/* УБИРАЕМ onSubmit из тега form. Он теперь просто для группировки. Можно заменить на <div> */}
        <div>
          {" "}
          {/* <form> */}
          <div className="mb-6 flex flex-col items-center">
            <div className="relative group">
              <Image
                src={currentAvatar}
                alt={user.name || "Аватар"}
                width={128}
                height={128}
                className="rounded-full object-cover border-4 border-pink-300 shadow-lg"
                priority
                key={currentAvatar}
              />
              {isEditing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="Изменить фото профиля"
                >
                  <Camera className="text-white h-8 w-8" />
                </button>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/png, image/jpeg, image/gif"
              onChange={handleImageChange}
              disabled={!isEditing}
            />
          </div>
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.div
                key="edit-fields"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mb-6">
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-pink-700 mb-1"
                  >
                    Имя
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-sm"
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500 mb-1"
                  >
                    Email (нельзя изменить)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed shadow-sm"
                  />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="view-fields"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <h2 className="text-2xl font-semibold text-pink-800">
                  {user.name}
                </h2>
                <p className="text-gray-600">{user.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {isEditing ? (
              <>
                <Button
                  type="button" // ИЗМЕНЕНИЕ: type="button"
                  onClick={handleSubmit} // ИЗМЕНЕНИЕ: вызываем handleSubmit напрямую
                  disabled={isUpdating}
                  className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
                >
                  <Save className="mr-2 h-5 w-5" />{" "}
                  {isUpdating ? "Сохранение..." : "Сохранить"}
                </Button>
                <Button
                  type="button"
                  onClick={handleEditToggle}
                  variant="outline"
                  className="w-full sm:w-auto border-pink-500 text-pink-600 hover:bg-pink-50 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
                >
                  <XCircle className="mr-2 h-5 w-5" /> Отмена
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={handleEditToggle}
                className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
              >
                <Edit2 className="mr-2 h-5 w-5" /> Редактировать профиль
              </Button>
            )}
          </div>
        </div>{" "}
        {/* </form> */}
      </motion.div>
      <p className="text-center text-pink-500 mt-8 text-sm">
        Показательные данные хранятся в localStorage.
      </p>
    </div>
  );
};

export default ProfilePage;
