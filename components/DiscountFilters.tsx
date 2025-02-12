import { Categories, Tags, SalePercent } from '../lib/types';

type StatusFilterType = 'all' | 'active' | 'inactive';

type DiscountFiltersProps = {
  statusFilter: StatusFilterType;
  categoryFilter: string[];
  salePercentFilter: string[];
  tagsFilter: string[];
  onStatusChange: (status: StatusFilterType) => void;
  onCategoryChange: (categories: string[]) => void;
  onSalePercentChange: (salePercent: string[]) => void;
  onTagsChange: (tags: string[]) => void;
};

export default function DiscountFilters({
  statusFilter,
  categoryFilter,
  salePercentFilter,
  tagsFilter,
  onStatusChange,
  onCategoryChange,
  onSalePercentChange,
  onTagsChange,
}: DiscountFiltersProps) {
  // Функция для обработки переключения множества для чекбоксов (группа, "Все" означает отсутствие фильтра)
  const handleToggle = (current: string[], value: string, setter: (values: string[]) => void) => {
    if (current.includes(value)) {
      setter(current.filter(item => item !== value));
    } else {
      setter([...current, value]);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg mb-8 w-min">
      <div className="flex flex-col gap-6">
        {/* Статус – реализовано через радио с кастомной стилизацией */}
        <div>
          <label className="block mb-3 text-white">Статус акции:</label>
          <div className="flex flex-col gap-4">
            {(
              [
                { value: 'all', label: 'Все', activeClass: 'bg-blue-500' },
                { value: 'active', label: 'Активные', activeClass: 'bg-green-500' },
                { value: 'inactive', label: 'Завершенные', activeClass: 'bg-red-500' },
              ] as const
            ).map(opt => (
              <label key={opt.value} className="cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value={opt.value}
                  checked={statusFilter === opt.value}
                  onChange={() => onStatusChange(opt.value)}
                  className="hidden"
                />
                <span
                  className={`px-4 py-1 rounded-full text-sm whitespace-nowrap 
                    ${
                      statusFilter === opt.value
                        ? opt.activeClass + ' text-white'
                        : 'bg-gray-300 text-gray-700'
                    }`}
                >
                  {opt.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Категории */}
        <div>
          <label className="block mb-3 text-white">Категории:</label>
          <div className="flex flex-col gap-4">
            {/* "Все" как переключатель – если нет выбранных значений, считаем что выбран "Все" */}
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={categoryFilter.length === 0}
                onChange={e => {
                  if (e.target.checked) onCategoryChange([]);
                }}
                className="hidden"
              />
              <span
                className={`px-4 py-1 rounded-full whitespace-nowrap text-sm 
                  ${
                    categoryFilter.length === 0
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
              >
                Все
              </span>
            </label>
            {Categories.map(category => {
              const isActive = categoryFilter.includes(category.value);
              return (
                <label key={category.value} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleToggle(categoryFilter, category.value, onCategoryChange)}
                    className="hidden"
                  />
                  <span
                    className={`px-4 py-1 rounded-full whitespace-nowrap text-sm 
                      ${isActive ? 'bg-purple-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    {category.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Скидка */}
        <div>
          <label className="block mb-3 text-white">Скидка:</label>
          <div className="flex flex-col gap-4">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={salePercentFilter.length === 0}
                onChange={e => {
                  if (e.target.checked) onSalePercentChange([]);
                }}
                className="hidden"
              />
              <span
                className={`px-4 py-1 rounded-full text-sm  
                  ${
                    salePercentFilter.length === 0
                      ? 'bg-yellow-500 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
              >
                Все
              </span>
            </label>
            {SalePercent.map(sale => {
              const isActive = salePercentFilter.includes(sale.value);
              return (
                <label key={sale.value} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() =>
                      handleToggle(salePercentFilter, sale.value, onSalePercentChange)
                    }
                    className="hidden"
                  />
                  <span
                    className={`px-4 py-1 rounded-full text-sm whitespace-nowrap 
                      ${isActive ? 'bg-yellow-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    {sale.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Теги */}
        <div>
          <label className="block mb-3 text-white">Теги:</label>
          <div className="flex flex-col gap-4">
            <label className="cursor-pointer">
              <input
                type="checkbox"
                checked={tagsFilter.length === 0}
                onChange={e => {
                  if (e.target.checked) onTagsChange([]);
                }}
                className="hidden"
              />
              <span
                className={`px-4 py-1 rounded-full text-sm 
                  ${
                    tagsFilter.length === 0 ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
                  }`}
              >
                Все
              </span>
            </label>
            {Tags.map(tag => {
              const isActive = tagsFilter.includes(tag.value);
              return (
                <label key={tag.value} className="cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={() => handleToggle(tagsFilter, tag.value, onTagsChange)}
                    className="hidden"
                  />
                  <span
                    className={`px-4 py-1 rounded-full text-sm whitespace-nowrap 
                      ${isActive ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                  >
                    {tag.label}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
