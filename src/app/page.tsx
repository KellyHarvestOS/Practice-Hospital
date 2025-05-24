import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Phone, Calendar } from 'lucide-react';
import Link from 'next/link'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"




export default function HomePage() {
  return (
    <div className="min-h-screen bg-pink-100 text-gray-800">
    
   

     
      <section
  className="bg-cover bg-center bg-no-repeat py-20"
  style={{ backgroundImage: "url('https://media.discordapp.net/attachments/1375097090924871800/1375841775721385984/1.jpg?ex=68332801&is=6831d681&hm=4022afefdebd03c8c828c096248c16cac37aac0821ece32d61268464a75aa0e2&=&format=webp&width=1730&height=450')" }}>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-7xl  font-bold mb-4 select-none">Добро пожаловать в HealthCare+</h2>
          <p className="text-2xl font-medium mb-6 select-none">Качественная медицинская помощь для всей семьи</p>
          <Link href ="/about">
           <Button className="text-lg bg-pink-800 px-6 py-3 select-none">Узнать больше</Button>
          </Link>
        </div>
      </section>

   
      <section className="py-16 bg-pink-100">
        <div className="container mx-auto px-4 gap-40">
          <h3 className="text-3xl font-bold text-center mb-10">Наши услуги</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6 border-4 border-pink-600 shadow-[0px_0px_50px_10px_rgba(219,39,119,0.5)] bg-pink-100">
              <CardContent className="animate-pulse ">
                <Stethoscope className="mx-auto mb-4 h-10 w-10 text-pink-600 " />
                <h4 className="text-xl font-semibold">Общие консультации</h4>
                <p className="mt-2 text-sm">Профессиональные врачи доступны ежедневно</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-4 border-pink-600 shadow-[0px_0px_50px_10px_rgba(219,39,119,0.5)] bg-pink-100">
              <CardContent className="animate-pulse">
                <Calendar className="mx-auto mb-4 h-10 w-10 text-pink-600" />
                <h4 className="text-xl font-semibold">Планирование визитов</h4>
                <p className="mt-2 text-sm">Простое онлайн-бронирование встреч</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6 border-4 border-pink-600 shadow-[0px_0px_50px_10px_rgba(219,39,119,0.5)] bg-pink-100">
              <CardContent className="animate-pulse">
                <Phone className="mx-auto mb-4 h-10 w-10 text-pink-600" />
                <h4 className="text-xl font-semibold">Экстренные звонки</h4>
                <p className="mt-2 text-sm">Доступны 24/7 для экстренных случаев</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
 <hr className=" border-1 border-pink-500 "/>
    <section className="bg-pink-100 py-16 px-4">
      
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-10">
          Часто задаваемые вопросы
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger>Как записаться на приём через сайт?</AccordionTrigger>
            <AccordionContent>
              Вы можете записаться через раздел "Запись на приём", выбрав врача, дату и удобное время.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>Можно ли посмотреть свою медицинскую карту?</AccordionTrigger>
            <AccordionContent>
              Да, авторизуйтесь в личном кабинете и перейдите в раздел "Мои данные".
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Как узнать расписание врачей?</AccordionTrigger>
            <AccordionContent>
              В разделе "Врачи" выберите специалиста и просмотрите его актуальное расписание.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger>Какие услуги доступны онлайн?</AccordionTrigger>
            <AccordionContent>
              Онлайн доступны: консультации, запись, просмотр анализов и заказ справок.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger>Насколько безопасны мои данные на сайте?</AccordionTrigger>
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