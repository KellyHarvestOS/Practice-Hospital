import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Phone, Calendar } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-pink-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-300">
      <section
        className="bg-cover bg-center bg-no-repeat py-20 relative"
        style={{ backgroundImage: "url('/images/1.jpg')" }}
      >
        <div className="absolute inset-0 bg-white/70 dark:bg-gray-900/80 pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-7xl font-bold mb-4 select-none drop-shadow-lg dark:text-yellow-300">
            Добро пожаловать в HealthCare+
          </h2>
          <p className="text-2xl font-medium mb-6 select-none dark:text-yellow-100">
            Качественная медицинская помощь для всей семьи
          </p>
          <Link href="/about">
            <Button className="text-lg bg-pink-800 dark:bg-yellow-700 dark:text-gray-900 hover:bg-pink-900 dark:hover:bg-yellow-800 px-6 py-3 select-none transition">
              Узнать больше
            </Button>
          </Link>
        </div>
      </section>

      <section className="py-16 bg-pink-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4 gap-40">
          <h3 className="text-3xl font-bold text-center mb-10 dark:text-yellow-200">
            Наши услуги
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6 border-4 border-pink-600 dark:border-yellow-600 shadow-[0px_0px_50px_10px_rgba(219,39,119,0.5)] bg-pink-100 dark:bg-gray-800 transition-colors duration-300">
              <CardContent>
                <Stethoscope className="mx-auto mb-4 h-10 w-10 text-pink-600 dark:text-yellow-300" />
                <h4 className="text-xl font-semibold dark:text-yellow-100">
                  Общие консультации
                </h4>
                <p className="mt-2 text-sm dark:text-gray-300">
                  Профессиональные врачи доступны ежедневно
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-4 border-pink-600 dark:border-yellow-600 shadow-[0px_0px_50px_10px_rgba(219,39,119,0.5)] bg-pink-100 dark:bg-gray-800 transition-colors duration-300">
              <CardContent>
                <Calendar className="mx-auto mb-4 h-10 w-10 text-pink-600 dark:text-yellow-300" />
                <h4 className="text-xl font-semibold dark:text-yellow-100">
                  Планирование визитов
                </h4>
                <p className="mt-2 text-sm dark:text-gray-300">
                  Простое онлайн-бронирование встреч
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-4 border-pink-600 dark:border-yellow-600 shadow-[0px_0px_50px_10px_rgba(219,39,119,0.5)] bg-pink-100 dark:bg-gray-800 transition-colors duration-300">
              <CardContent>
                <Phone className="mx-auto mb-4 h-10 w-10 text-pink-600 dark:text-yellow-300" />
                <h4 className="text-xl font-semibold dark:text-yellow-100">
                  Экстренные звонки
                </h4>
                <p className="mt-2 text-sm dark:text-gray-300">
                  Доступны 24/7 для экстренных случаев
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <hr className="border-1 border-pink-500 dark:border-yellow-700 transition-colors duration-300" />
      <section className="bg-pink-100 dark:bg-gray-900 py-16 px-4 transition-colors duration-300">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-pink-600 dark:text-yellow-300 mb-10">
            Часто задаваемые вопросы
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Как записаться на приём через сайт?
              </AccordionTrigger>
              <AccordionContent>
                Вы можете записаться через раздел "Запись на приём", выбрав врача, дату и удобное время.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Можно ли посмотреть свою медицинскую карту?
              </AccordionTrigger>
              <AccordionContent>
                Да, авторизуйтесь в личном кабинете и перейдите в раздел "Мои данные".
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Как узнать расписание врачей?
              </AccordionTrigger>
              <AccordionContent>
                В разделе "Врачи" выберите специалиста и просмотрите его актуальное расписание.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Какие услуги доступны онлайн?
              </AccordionTrigger>
              <AccordionContent>
                Онлайн доступны: консультации, запись, просмотр анализов и заказ справок.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                Насколько безопасны мои данные на сайте?
              </AccordionTrigger>
              <AccordionContent>
                Ваши данные шифруются и защищены по современным стандартам безопасности.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </div>
  );
}