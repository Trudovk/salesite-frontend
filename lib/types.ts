export type DiscountsResponseType = {
  count: number;
  next: string | null;
  previous: string | null;
  results: DiscountType[];
};

export type DiscountType = {
  id: number;
  title: string;
  description: string;
  company: number;
  categories: number[] | number;
  sales: number;
  created_at: string;
  sale_date_start: string;
  sale_date_end: string;
  tags: number[];
};

export const Categories = [
  { value: '1', label: 'Фастфуд' },
  { value: '2', label: 'Одежда' },
  { value: '3', label: 'Кинотеатры' },
  { value: '4', label: 'Магазины Электроники' },
  { value: '5', label: 'Экскурсии' },
  { value: '6', label: 'Туры' },
  { value: '7', label: 'Продуктовые' },
  { value: '8', label: 'Хоз-товары' },
  { value: '9', label: 'Развлечения' },
  { value: '10', label: 'Детские игрушки' },
  { value: '11', label: 'Канцтовары' },
  { value: '12', label: 'Техника' },
  { value: '13', label: 'Садовые принадлежности' },
];

export const SalePercent = [
  { value: '1', label: '10%' },
  { value: '2', label: '20%' },
  { value: '3', label: '30%' },
  { value: '4', label: '40%' },
  { value: '7', label: '50%' },
  { value: '8', label: '60%' },
  { value: '9', label: '70%' },
  { value: '10', label: '80%' },
  { value: '11', label: '90%' },
  { value: '6', label: '100%' },
];

export const Tags = [
  { value: '1', label: 'Лето в разгаре' },
  { value: '2', label: 'Времяпрепровождение' },
  { value: '3', label: 'Полный угар' },
  { value: '5', label: 'Все для дома' },
  { value: '6', label: 'Все для школы' },
  { value: '7', label: 'Вместе в школу' },
  { value: '8', label: 'Вторники с Пятёрочкой' },
  { value: '9', label: 'ГречкуВсем' },
  { value: '10', label: 'apple' },
  { value: '11', label: 'Осень' },
  { value: '12', label: 'Горячий завтрак' },
  { value: '13', label: 'Зимняя скидка' },
];

export const Companies = [
  { value: '1', label: 'Вкусно и Точка', description: 'фастфуд рестораны' },
  { value: '2', label: 'Zara', description: 'Сеть магазинов одежды' },
  { value: '3', label: 'Синема Парк', description: 'Сеть кинотеатров' },
  { value: '4', label: 'Детский Мир', description: 'Магазин детских игрушек' },
  { value: '5', label: 'Fix Price', description: 'Универсальный, бюджетный супермаркет' },
  { value: '6', label: 'Леонардо', description: 'Магазин для хоббизма и канцтоваров' },
  { value: '7', label: 'ТурыРоссии', description: 'Туры по России' },
  { value: '8', label: 'Пятёрочка', description: 'Сеть супермаркетов' },
  { value: '9', label: 'apple', description: 'Производитель смартфонов' },
  { value: '10', label: 'Шаурма', description: 'Сеть шаурмечных 24 часа' },
  { value: '11', label: 'Старбакс', description: 'Кофейня, международная сеть' },
  { value: '12', label: 'Макдональдс', description: 'Фастфуд американский' },
];
