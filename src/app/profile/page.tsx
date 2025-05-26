"use client";
import { useTheme } from "@/app/context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect, ChangeEvent, useRef } from "react";
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
  XCircle,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ProfilePage = () => {
  const { theme, toggleTheme } = useTheme();
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

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/signIn");
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user && !isEditing) {
      setEditedName(user.name);
      setImagePreview(user.profileImageUrl || null);
      setEditedImageFile(null);
    }
  }, [user, isEditing]);

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
    const nextIsEditing = !isEditing;
    setIsEditing(nextIsEditing);
    setError(null);
    setSuccessMessage(null);

    if (user && nextIsEditing) {
      setEditedName(user.name);
      setImagePreview(user.profileImageUrl || null);
      setEditedImageFile(null);
    }
  };

  const handleSubmit = async () => {
    if (!user) return;
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
      updatedData.profileImageUrl = imagePreview as string;
      hasChanges = true;
    }
    if (!hasChanges) {
      setIsUpdating(false);
      setIsEditing(false);
      setSuccessMessage("Изменений не было.");
      return;
    }
    try {
      await updateUser(user.id, updatedData);
      setSuccessMessage("Профиль успешно обновлен!");
      setIsEditing(false);
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
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)] bg-pink-50 dark:bg-gray-900">
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
    <div className="min-h-[calc(100vh-150px)] bg-gradient-to-br from-pink-100 via-pink-50 to-rose-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-12 px-4 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-2xl w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-pink-700 dark:text-yellow-300 mb-8 text-center">
          Мой Профиль
        </h1>
        <div className="flex justify-end mb-6">
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-pink-100 dark:bg-gray-800 border border-pink-200 dark:border-gray-700 text-pink-700 dark:text-yellow-300 shadow transition"
            title="Переключить тему"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            {theme === "dark" ? "Светлая тема" : "Тёмная тема"}
          </button>
        </div>
        {error && (
          <motion.div className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-700 dark:text-red-200 p-4 mb-6 rounded-md flex items-center">
            <XCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
        {successMessage && (
          <motion.div className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-700 dark:text-green-200 p-4 mb-6 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{successMessage}</span>
          </motion.div>
        )}
        <div>
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
                    className="block text-sm font-medium text-pink-700 dark:text-yellow-300 mb-1"
                  >
                    Имя
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="w-full px-4 py-2 border border-pink-300 dark:border-yellow-300 rounded-lg focus:ring-pink-500 focus:border-pink-500 shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-yellow-100"
                    required
                  />
                </div>
                <div className="mb-6">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500 dark:text-gray-300 mb-1"
                  >
                    Email (нельзя изменить)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-sm"
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
                <h2 className="text-2xl font-semibold text-pink-800 dark:text-yellow-200">
                  {user.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            {isEditing ? (
              <>
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isUpdating}
                  className="w-full sm:w-auto bg-pink-600 hover:bg-pink-700 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
                >
                  <Save className="mr-2 h-5 w-5" />
                  {isUpdating ? "Сохранение..." : "Сохранить"}
                </Button>
                <Button
                  type="button"
                  onClick={handleEditToggle}
                  variant="outline"
                  className="w-full sm:w-auto border-pink-500 dark:border-yellow-400 text-pink-600 dark:text-yellow-200 hover:bg-pink-50 dark:hover:bg-gray-800 font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
                >
                  <XCircle className="mr-2 h-5 w-5" /> Отмена
                </Button>
              </>
            ) : (
              <Button
                type="button"
                onClick={handleEditToggle}
                className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 dark:bg-yellow-600 dark:hover:bg-yellow-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-150 ease-in-out flex items-center justify-center"
              >
                <Edit2 className="mr-2 h-5 w-5" /> Редактировать профиль
              </Button>
            )}
          </div>
        </div>
      </motion.div>
      <p className="text-center text-pink-500 dark:text-yellow-300 mt-8 text-sm">
        Показательные данные хранятся в localStorage.
      </p>
    </div>
  );
};

export default ProfilePage;