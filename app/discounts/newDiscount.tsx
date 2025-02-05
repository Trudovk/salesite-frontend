import React, { useState } from 'react';
import getCookie from '../../lib/getCookie';
import { Companies, Categories, SalePercent, Tags } from '../../lib/types';

const csrftoken = getCookie('csrftoken');

const CSRFToken = () => {
  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken || ''} />;
};

interface FormState {
  title: string;
  description: string;
  company: string;
  categories: string;
  sales: string;
  sale_date_start: string;
  sale_date_end: string;
  tags: string[];
}

export default function NewDiscount() {
  const [form, setForm] = useState<FormState>({
    title: '',
    description: '',
    company: '',
    categories: '',
    sales: '',
    sale_date_start: '',
    sale_date_end: '',
    tags: [],
  });

  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!form.title.trim()) errors.title = 'Обязательное поле';
    else if (form.title.length > 100) errors.title = 'Максимум 100 символов';

    if (!form.description.trim()) errors.description = 'Обязательное поле';
    else if (form.description.length > 500) errors.description = 'Максимум 500 символов';

    if (!form.company) errors.company = 'Выберите компанию';
    if (!form.categories) errors.categories = 'Выберите категорию';
    if (!form.sales) errors.sales = 'Выберите размер скидки';

    const today = new Date().toISOString().split('T')[0];
    if (!form.sale_date_start) errors.sale_date_start = 'Укажите дату начала';
    else if (form.sale_date_start < today) errors.sale_date_start = 'Дата не может быть в прошлом';

    if (!form.sale_date_end) errors.sale_date_end = 'Укажите дату окончания';
    else if (form.sale_date_start && form.sale_date_end < form.sale_date_start)
      errors.sale_date_end = 'Дата окончания не может быть раньше начала';

    if (form.tags.length === 0) errors.tags = 'Выберите хотя бы один тег';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions, option => option.value);
    setForm(prev => ({ ...prev, tags: values }));
    if (fieldErrors.tags) {
      setFieldErrors(prev => ({ ...prev, tags: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      const payload = {
        title: form.title,
        description: form.description,
        company: Number(form.company),
        categories: Number(form.categories),
        sales: Number(form.sales),
        sale_date_start: form.sale_date_start,
        sale_date_end: form.sale_date_end,
        tags: form.tags.map(Number),
      };

      const response = await fetch('/catalog/api/v1/discount/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrftoken || '',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type');
        let errorMessage = 'Ошибка при добавлении акции';
        if (contentType && contentType.includes('application/json')) {
          const errData = await response.json();
          errorMessage = JSON.stringify(errData);
        } else {
          errorMessage = await response.text();
        }
        throw new Error(errorMessage);
      }

      // Сброс формы после успешной отправки
      setForm({
        title: '',
        description: '',
        company: '',
        categories: '',
        sales: '',
        sale_date_start: '',
        sale_date_end: '',
        tags: [],
      });

      alert('Акция успешно создана!');
    } catch (err: any) {
      setError(err.message || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Добавить новую акцию</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <CSRFToken />

        {/* Заголовок */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Заголовок <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
              fieldErrors.title
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          {fieldErrors.title && <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>}
        </div>

        {/* Описание */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Описание <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
              fieldErrors.description
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
          />
          {fieldErrors.description && (
            <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>
          )}
        </div>

        {/* Выпадающие списки */}
        {[
          { field: 'company', label: 'Компания', options: Companies },
          { field: 'categories', label: 'Категория', options: Categories },
          { field: 'sales', label: 'Скидка', options: SalePercent },
        ].map(({ field, label, options }) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label} <span className="text-red-500">*</span>
            </label>
            <select
              name={field}
              value={form[field as keyof FormState]}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                fieldErrors[field]
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            >
              <option value="" disabled>
                Выберите {label.toLowerCase()}
              </option>
              {options.map(item => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {fieldErrors[field] && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors[field]}</p>
            )}
          </div>
        ))}

        {/* Даты */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дата начала <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="sale_date_start"
              value={form.sale_date_start}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                fieldErrors.sale_date_start
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {fieldErrors.sale_date_start && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.sale_date_start}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Дата окончания <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              name="sale_date_end"
              value={form.sale_date_end}
              onChange={handleChange}
              min={form.sale_date_start || new Date().toISOString().split('T')[0]}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
                fieldErrors.sale_date_end
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
              }`}
            />
            {fieldErrors.sale_date_end && (
              <p className="mt-1 text-sm text-red-600">{fieldErrors.sale_date_end}</p>
            )}
          </div>
        </div>

        {/* Теги */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Теги <span className="text-red-500">*</span>
          </label>
          <select
            name="tags"
            multiple
            value={form.tags}
            onChange={handleTagsChange}
            className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${
              fieldErrors.tags
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200'
            }`}
            size={4}
          >
            {Tags.map(tag => (
              <option key={tag.value} value={tag.value} className="px-3 py-1 hover:bg-blue-50">
                {tag.label}
              </option>
            ))}
          </select>
          {fieldErrors.tags && <p className="mt-1 text-sm text-red-600">{fieldErrors.tags}</p>}
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg 
                     transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                     flex items-center justify-center"
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Создание...
            </>
          ) : (
            'Создать акцию'
          )}
        </button>
      </form>
    </div>
  );
}
