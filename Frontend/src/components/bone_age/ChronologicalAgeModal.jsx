import React, { useState } from 'react';
import { X } from 'lucide-react';

const ChronologicalAgeModal = ({ isOpen, onClose, gender, onAgeSubmit }) => {
  const [age, setAge] = useState('');

  const handleSubmit = () => {
    if (age.trim() === '') return;
    
    // Передаем возраст и пол в callback
    onAgeSubmit({
      age: age.trim(),
      gender: gender
    });
    
    // Закрываем текущую модалку
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  const genderLabel = gender === 'male' ? 'мальчик' : 'девочка';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        {/* Заголовок */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            Хронологический возраст ({genderLabel})
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Поле ввода */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Введите хронологический возраст
          </label>
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Например: 8 лет 5 месяцев"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
            autoFocus
          />
          <p className="text-xs text-gray-500 mt-1">
            Можно указать в формате: "8 лет 5 месяцев" или "8.5"
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
            disabled={age.trim() === ''}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            ОК
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChronologicalAgeModal;