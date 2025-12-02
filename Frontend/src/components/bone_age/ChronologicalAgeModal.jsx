// Frontend/src/components/bone_age/ChronologicalAgeModal.jsx
import React, { useState } from 'react';
import BaseModal from '../common/BaseModal.jsx';

const ChronologicalAgeModal = ({ isOpen, onClose, gender, onAgeSubmit }) => {
  const [years, setYears] = useState('');
  const [months, setMonths] = useState('');

  const handleYearsChange = (e) => {
    // Оставляем только цифры
    const value = e.target.value.replace(/\D/g, '');
    setYears(value);
  };

  const handleMonthsChange = (e) => {
    // Оставляем только цифры
    const value = e.target.value.replace(/\D/g, '');
    setMonths(value);
  };

  const handleSubmit = () => {
    // Проверяем, что хотя бы одно поле заполнено
    if (years.trim() === '' && months.trim() === '') return;
    
    // Формируем строку возраста
    let ageStr = '';
    if (years.trim() !== '') {
      ageStr += years.trim();
      const numYears = parseInt(years.trim());
      if (numYears === 1) {
        ageStr += ' год';
      } else if (numYears < 5) {
        ageStr += ' года';
      } else {
        ageStr += ' лет';
      }
    }
    
    if (months.trim() !== '') {
      if (ageStr !== '') ageStr += ' ';
      ageStr += months.trim();
      const numMonths = parseInt(months.trim());
      if (numMonths === 1) {
        ageStr += ' месяц';
      } else if (numMonths < 5) {
        ageStr += ' месяца';
      } else {
        ageStr += ' месяцев';
      }
    }
    
    const ageData = {
      age: ageStr,
      gender: gender
    };
    
    console.log('Submitting age:', ageData);
    
    // Передаем возраст и пол в callback
    onAgeSubmit(ageData);
    
    // Закрываем текущую модалку
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const genderLabel = gender === 'male' ? 'мальчик' : 'девочка';
  const title = `Хронологический возраст (${genderLabel})`;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="small"
    >
      <div className="p-6">
        {/* Поля ввода */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Введите хронологический возраст
          </label>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Годы
              </label>
              <input
                type="text"
                value={years}
                onChange={handleYearsChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
                autoFocus
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Месяцы
              </label>
              <input
                type="text"
                value={months}
                onChange={handleMonthsChange}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-1">
            Укажите возраст в годах и/или месяцах. В поля можно вводить только цифры.
          </p>
        </div>

        {/* Кнопки */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            disabled={years.trim() === '' && months.trim() === ''}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            ОК
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default ChronologicalAgeModal;