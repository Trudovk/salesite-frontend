import React from 'react';
import { motion } from 'framer-motion';

export function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-indigo-900 flex flex-col items-center justify-center text-center p-6">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-extrabold text-white mb-4"
      >
        Хотите найти скидки или добавить новые?
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl"
      >
        Экономьте время и деньги с нами!
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex gap-6"
      >
        <a
          href="/discounts"
          className="bg-white text-blue-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition duration-200"
        >
          Найти скидки
        </a>
        <a
          href="/newDiscount"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-200"
        >
          Добавить скидки
        </a>
      </motion.div>
    </div>
  );
}
