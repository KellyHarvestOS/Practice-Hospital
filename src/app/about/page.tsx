import { Users, HeartPulse, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
       
       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
  <div className="flex justify-center">
    <img
      src="/images/1 (1).jpg"
      alt="Наша команда"
      className="rounded-3xl shadow-2xl w-80 h-80 object-cover border-4 border-pink-300"
    />
  </div>
  <div className="flex justify-center">
    <img
      src="/images/1 (4).jpg"
      alt="Наша команда"
      className="rounded-3xl shadow-2xl w-80 h-80 object-cover border-4 border-pink-300"
    />
  </div>
  <div className="flex justify-center">
    <img
      src="/images/1 (3).jpg"
      alt="Наша команда"
      className="rounded-3xl shadow-2xl w-80 h-80 object-cover border-4 border-pink-300"
    />
  </div>
  <div className="flex justify-center">
    <img
      src="/images/1 (2).jpg"
      alt="Наша команда"
      className="rounded-3xl shadow-2xl w-80 h-80 object-cover border-4 border-pink-300"
    />
  </div>
</div>
        <div className="flex-1">
          <h1 className="text-5xl font-extrabold text-pink-700 mb-6 drop-shadow-lg">
            О клинике HealthCare+
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-semibold text-pink-600">HealthCare+</span> — современная клиника, где забота о каждом пациенте стоит на первом месте. Мы объединяем опытных специалистов, передовые технологии и индивидуальный подход, чтобы обеспечить вам и вашей семье максимальный комфорт и безопасность.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
              <Users className="text-pink-500 w-8 h-8 mb-2" />
              <span className="font-bold text-pink-700 text-xl">20+</span>
              <span className="text-sm text-gray-600 text-center">Квалифицированных врачей</span>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
              <HeartPulse className="text-pink-500 w-8 h-8 mb-2" />
              <span className="font-bold text-pink-700 text-xl">24/7</span>
              <span className="text-sm text-gray-600 text-center">Поддержка и экстренная помощь</span>
            </div>
            <div className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center">
              <Award className="text-pink-500 w-8 h-8 mb-2" />
              <span className="font-bold text-pink-700 text-xl">10 лет</span>
              <span className="text-sm text-gray-600 text-center">Опыт работы</span>
            </div>
          </div>
          <ul className="space-y-2 text-gray-700 mb-4">
            <li className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-pink-500 rounded-full"></span>
              Современное оборудование и уютная атмосфера
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-pink-500 rounded-full"></span>
              Индивидуальный подход к каждому пациенту
            </li>
            <li className="flex items-center gap-2">
              <span className="inline-block w-3 h-3 bg-pink-500 rounded-full"></span>
              Безопасность и конфиденциальность ваших данных
            </li>
          </ul>
          <div className="mt-6">
            <span className="inline-block bg-pink-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-700 transition">
              Мы заботимся о вашем здоровье!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}