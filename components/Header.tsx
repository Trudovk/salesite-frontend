import React from 'react';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <a href="/">Salesite</a>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/discounts" className="hover:text-gray-400">
                Скидки
              </a>
            </li>
            <li>
              <a href="newDiscount" className="hover:text-gray-400">
                Добавить скидку
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
