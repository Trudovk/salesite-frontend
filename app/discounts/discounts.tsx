import { useInfiniteQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import type { DiscountType, DiscountsResponseType } from 'lib/types';
import getDiscountStatus from 'lib/getDiscountStatus';
import DiscountFilters from '../../components/DiscountFilters';
import { Categories } from 'lib/types';
import DiscountCard from 'components/DiscountCard';
import { useInView } from 'react-intersection-observer';

export default function Discounts() {
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [salePercentFilter, setSalePercentFilter] = useState<string[]>([]);
  const [tagsFilter, setTagsFilter] = useState<string[]>([]);

  const { data, error, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery<DiscountsResponseType>({
      queryKey: ['discounts', statusFilter, categoryFilter],
      queryFn: async ({ pageParam = 1 }: any) => {
        const params = new URLSearchParams({
          page: pageParam.toString(),
        });

        const response = await fetch(`/catalog/api/v1/discount/?${params}`);
        if (!response.ok) throw new Error('Ошибка загрузки');
        return response.json();
      },
      getNextPageParam: lastPage => {
        if (!lastPage.next) return undefined;
        const url = new URL(lastPage.next);
        return url.searchParams.get('page');
      },
      initialPageParam: 1,
    });
  const { ref, inView } = useInView({
    threshold: 1.0,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const allDiscounts = data?.pages.flatMap(page => page.results) || [];

  const filteredDiscounts = allDiscounts.filter(discount => {
    const { isActive } = getDiscountStatus(discount.sale_date_start, discount.sale_date_end);

    // Нормализация категорий к строковому формату
    const discountCategories = Array.isArray(discount.categories)
      ? discount.categories.map(String)
      : [String(discount.categories)];

    // Нормализация скидок к строковому формату
    const discountSales = Array.isArray(discount.sales)
      ? discount.sales.map(String)
      : [String(discount.sales)];

    // Нормализация тегов к строковому формату
    const discountTags = Array.isArray(discount.tags)
      ? discount.tags.map(String)
      : [String(discount.tags)];

    // Проверка статуса
    const statusMatch =
      statusFilter === 'all' ||
      (statusFilter === 'active' && isActive) ||
      (statusFilter === 'inactive' && !isActive);

    // Проверка категорий
    const categoryMatch =
      categoryFilter.length === 0 || discountCategories.some(cat => categoryFilter.includes(cat));

    // Проверка скидок
    const salePercentMatch =
      salePercentFilter.length === 0 ||
      discountSales.some(sale => salePercentFilter.includes(sale));

    // Проверка тегов
    const tagsMatch = tagsFilter.length === 0 || discountTags.some(tag => tagsFilter.includes(tag));

    return statusMatch && categoryMatch && salePercentMatch && tagsMatch;
  });

  if (status === 'pending') {
    return <div className="text-white text-center py-8"> Загрузка... </div>;
  }

  if (status === 'error') {
    return (
      <div className="text-red-500 text-center py-8">
        Ошибка: {error instanceof Error ? error.message : 'Неизвестная ошибка'}
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 flex gap-6">
      <DiscountFilters
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        salePercentFilter={salePercentFilter}
        tagsFilter={tagsFilter}
        onStatusChange={setStatusFilter}
        onCategoryChange={setCategoryFilter}
        onSalePercentChange={setSalePercentFilter}
        onTagsChange={setTagsFilter}
      />
      <div className="flex flex-col">
        {/* Список акций */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDiscounts.map(discount => (
            <DiscountCard discount={discount} key={discount.id} />
          ))}
        </div>

        {/* Сообщение если нет акций */}
        {filteredDiscounts.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            По выбранным фильтрам акций не найдено
          </div>
        )}

        {/* Кнопка загрузки следующих страниц */}
        {hasNextPage && (
          <div className="text-center mt-8">
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 transition-colors"
            >
              {isFetchingNextPage ? 'Загрузка...' : <div ref={ref}>Загрузить еще</div>}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
