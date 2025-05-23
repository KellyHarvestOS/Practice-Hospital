import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Phone, Calendar } from 'lucide-react';


export default function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50 text-gray-800">
    
      <header className="bg-blue-700 text-white p-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">HealthCare+ Hospital</h1>
          <Button variant="secondary">Записаться</Button>
        </div>
      </header>

     
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-semibold mb-4">Добро пожаловать в HealthCare+</h2>
          <p className="text-lg mb-6">Качественная медицинская помощь для всей семьи</p>
          <Button className="text-lg px-6 py-3">Узнать больше</Button>
        </div>
      </section>

   
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">Наши услуги</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <CardContent>
                <Stethoscope className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h4 className="text-xl font-semibold">Общие консультации</h4>
                <p className="mt-2 text-sm">Профессиональные врачи доступны ежедневно</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <Calendar className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h4 className="text-xl font-semibold">Планирование визитов</h4>
                <p className="mt-2 text-sm">Простое онлайн-бронирование встреч</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent>
                <Phone className="mx-auto mb-4 h-10 w-10 text-blue-600" />
                <h4 className="text-xl font-semibold">Экстренные звонки</h4>
                <p className="mt-2 text-sm">Доступны 24/7 для экстренных случаев</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-blue-700 text-white py-6 mt-12">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 HealthCare+ Hospital. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}