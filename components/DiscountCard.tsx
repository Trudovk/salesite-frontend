import type { DiscountType } from '../lib/types';
import { Categories, SalePercent, Tags, Companies } from '../lib/types';
import getDiscountStatus from '../lib/getDiscountStatus';

export default function DiscountCard({ discount }: { discount: DiscountType }) {
  const { status: discountStatus, isActive } = getDiscountStatus(
    discount.sale_date_start,
    discount.sale_date_end
  );

  const salePercentValue = SalePercent.find(s => s.value === String(discount.sales));
  // Получаем информацию о компании
  const companyInfo = Companies.find(c => c.value === String(discount.company));

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-xl transform transition-transform hover:scale-102 flex flex-col justify-between min-w-xs">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{discount.title}</h3>
          {/* Новая секция с информацией о компании */}
          {companyInfo && <p className="text-sm text-gray-300 mt-1">{companyInfo.label}</p>}
          {salePercentValue && (
            <span className="text-yellow-400 font-bold mt-1 block">
              Скидка: {salePercentValue.label}
            </span>
          )}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            isActive ? 'bg-green-600' : 'bg-red-600'
          } text-white`}
        >
          {discountStatus}
        </span>
      </div>

      <p className="text-gray-300 mb-4">{discount.description}</p>

      <div className="text-sm text-gray-400 space-y-1">
        <div>
          <span className="font-medium">Начало:</span>{' '}
          {new Date(discount.sale_date_start).toLocaleDateString()}
        </div>
        <div>
          <span className="font-medium">Окончание:</span>{' '}
          {new Date(discount.sale_date_end).toLocaleDateString()}
        </div>
      </div>
      <div>
        {/* Категории */}
        {discount.categories && (
          <div className="mt-4 flex flex-wrap gap-2">
            {(Array.isArray(discount.categories) ? discount.categories : [discount.categories]).map(
              categoryId => {
                const category = Categories.find(c => c.value === String(categoryId));
                return (
                  <span
                    key={categoryId}
                    className="px-2 py-1 bg-purple-600 rounded-full text-xs text-white"
                  >
                    {category?.label || `Категория ${categoryId}`}
                  </span>
                );
              }
            )}
          </div>
        )}

        {/* Теги */}
        {discount.tags && discount.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {discount.tags.map(tagId => {
              const tag = Tags.find(t => t.value === String(tagId));
              return (
                <span key={tagId} className="px-2 py-1 bg-blue-600 rounded-full text-xs text-white">
                  {tag?.label || `Тег ${tagId}`}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
