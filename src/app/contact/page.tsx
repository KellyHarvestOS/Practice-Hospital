'use client';

import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactsPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-16 px-4 text-gray-800 dark:text-gray-100">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center text-pink-600 dark:text-yellow-300 mb-10">Контакты</h1>
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Phone className="text-pink-500 dark:text-yellow-300 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Телефон</h3>
                <p>+7 (707) 637-59-00</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="text-pink-500 dark:text-yellow-300 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Электронная почта</h3>
                <p>tamerla@vilichetSlunoy.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="text-pink-500 dark:text-yellow-300 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Адрес</h3>
                <p>г. Астана, ул. Жаншу, д. 99</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock className="text-pink-500 dark:text-yellow-300 mt-1" />
              <div>
                <h3 className="text-lg font-semibold">Часы работы</h3>
                <p>Пн - Пт: 8:00 – 20:00<br />Сб - Вс: 9:00 – 18:00</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-pink-600 dark:text-yellow-300">Связаться с нами</h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              />
              <input
                type="email"
                placeholder="Ваш email"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              />
              <textarea
                placeholder="Ваше сообщение"
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100"
              />
              <button
                type="submit"
                className="bg-pink-500 dark:bg-yellow-700 text-white dark:text-gray-900 px-6 py-2 rounded hover:bg-pink-600 dark:hover:bg-yellow-800 transition"
              >
                Отправить
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 perspective-distant">
          <h2 className="text-xl font-semibold mb-4 text-center">Мы на карте</h2>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Aexample&source=constructor"
            width="100%"
            height="400"
            className="rounded-lg border rotate-x-10 rotate-z-0 shadow-lg shadow-pink-500/50"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;