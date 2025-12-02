// Frontend/src/components/bone_age/BoneAgeModal.jsx
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import BaseModal from '../common/BaseModal.jsx';

const BoneAgeModal = ({ isOpen, onClose, gender = 'male', chronologicalAge, insertTextToTextarea }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Названия картинок с расшифровкой возраста
  const imageData = [
    { code: '8m', label: '8 месяцев' },
    { code: '10m', label: '10 месяцев' },
    { code: '12m', label: '12 месяцев (1 год)' },
    { code: '1y2m', label: '1 год 2 месяца' },
    { code: '1y4m', label: '1 год 4 месяца' },
    { code: '1y6m', label: '1 год 6 месяцев' },
    { code: '1y8m', label: '1 год 8 месяцев' },
    { code: '2y', label: '2 года' },
    { code: '2y4m', label: '2 года 4 месяца' },
    { code: '2y6m', label: '2 года 6 месяцев' },
    { code: '3y', label: '3 года' },
    { code: '3y6m', label: '3 года 6 месяцев' },
    { code: '4y', label: '4 года' },
    { code: '4y6m', label: '4 года 6 месяцев' },
    { code: '5y', label: '5 лет' },
    { code: '5y6m', label: '5 лет 6 месяцев' },
    { code: '6y', label: '6 лет' },
    { code: '7y', label: '7 лет' },
    { code: '8y', label: '8 лет' },
    { code: '9y', label: '9 лет' },
    { code: '10y', label: '10 лет' },
    { code: '11y', label: '11 лет' },
    { code: '12y', label: '12 лет' },
    { code: '13y', label: '13 лет' },
    { code: '14y', label: '14 лет' },
    { code: '15y', label: '15 лет' },
    { code: '16y', label: '16 лет' },
    { code: '17y', label: '17 лет' },
    { code: '18y', label: '18 лет' }
  ];

  // Формируем путь с учетом пола
  const images = imageData.map(data => `images/bone_age/${gender}/${data.code}.png`);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // НОВАЯ ФУНКЦИЯ: расчет разницы и вставка в описание
  const handleAddToDescription = () => {
    console.log('chronologicalAge in addToDescription:', chronologicalAge);
    
    if (!chronologicalAge) {
      console.log('Missing chronologicalAge:', chronologicalAge);
      alert('Не указан хронологический возраст');
      return;
    }
    
    if (!insertTextToTextarea || typeof insertTextToTextarea !== 'function') {
      console.log('Missing insertTextToTextarea function:', insertTextToTextarea);
      alert('Не удается вставить текст в описание');
      return;
    }
    
    // Получаем данные текущего возраста
    const currentBoneAge = imageData[currentIndex];
    console.log('Current bone age:', currentBoneAge);
    
    // ИСПРАВЛЕННАЯ функция парсинга возраста
    const parseAgeToMonths = (ageStr) => {
      console.log('Parsing bone age string:', ageStr);
      
      // Разбиваем строку на части и ищем числа
      const parts = ageStr.split(/\s+/);
      let years = 0;
      let months = 0;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const num = parseInt(part);
        
        // Если это число и следующая часть содержит индикатор времени
        if (!isNaN(num)) {
          if (i + 1 < parts.length) {
            const nextPart = parts[i + 1];
            if (nextPart.includes('год')) {
              years = num;
            } else if (nextPart.includes('месяц')) {
              months = num;
            }
          }
        }
      }
      
      const result = years * 12 + months;
      console.log('Parsed bone age:', { years, months, totalMonths: result });
      
      return result;
    };
    
    // ИСПРАВЛЕННАЯ функция парсинга хронологического возраста
    const parseChronologicalAge = (ageStr) => {
      console.log('Parsing age:', ageStr);
      
      // Разбиваем строку на части и ищем числа
      const parts = ageStr.split(/\s+/);
      let years = 0;
      let months = 0;
      
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const num = parseInt(part);
        
        // Если это число и следующая часть содержит индикатор времени
        if (!isNaN(num)) {
          if (i + 1 < parts.length) {
            const nextPart = parts[i + 1];
            if (nextPart.includes('год')) {
              years = num;
            } else if (nextPart.includes('месяц')) {
              months = num;
            }
          }
        }
      }
      
      const result = years * 12 + months;
      console.log('Total months:', result);
      
      // Если не удалось найти ни лет, ни месяцев
      if (result === 0) {
        console.log('Failed to parse age, returning 0');
        return 0;
      }
      
      return result;
    };
    
    const boneAgeMonths = parseAgeToMonths(currentBoneAge.label);
    const chronologicalAgeMonths = parseChronologicalAge(chronologicalAge);
    
    console.log('Bone age months:', boneAgeMonths, 'Chronological age months:', chronologicalAgeMonths);
    
    // Вычисляем разницу в месяцах
    const difference = Math.abs(chronologicalAgeMonths - boneAgeMonths);
    
    // ИСПРАВЛЕННАЯ функция для форматирования разницы
    const formatDifference = (months) => {
      // Преобразуем месяцы в годы и оставшиеся месяцы
      const years = Math.floor(months / 12);
      const remainingMonths = months % 12;
      
      console.log('Formatting difference:', { months, years, remainingMonths });
      
      // Форматируем с правильными окончаниями
      let yearsText = '';
      if (years > 0) {
        if (years === 1) {
          yearsText = '1 год';
        } else if (years < 5) {
          yearsText = `${years} года`;
        } else {
          yearsText = `${years} лет`;
        }
      }
      
      let monthsText = '';
      if (remainingMonths > 0) {
        if (remainingMonths === 1) {
          monthsText = '1 месяц';
        } else if (remainingMonths < 5) {
          monthsText = `${remainingMonths} месяца`;
        } else {
          monthsText = `${remainingMonths} месяцев`;
        }
      }
      
      // Собираем итоговую строку
      if (yearsText && monthsText) {
        return `${yearsText} ${monthsText}`;
      } else if (yearsText) {
        return yearsText;
      } else if (monthsText) {
        return monthsText;
      } else {
        return '0 месяцев';
      }
    };
    
    // Определяем, меньше или больше костный возраст
    const isLess = boneAgeMonths < chronologicalAgeMonths;
    
    // Форматируем текст для вставки
    const comparisonText = isLess ? 'меньше' : 'больше';
    const formattedDifference = formatDifference(difference);
    
    const textToInsert = `Костный возраст соответствует ${currentBoneAge.label}, что на ${formattedDifference} ${comparisonText} хронологического.\n`;
    
    console.log('Text to insert:', textToInsert);
    
    try {
      // Вставляем текст в описание
      insertTextToTextarea(textToInsert);
      
      // Закрываем модалку
      onClose();
    } catch (error) {
      console.error('Error inserting text:', error);
      alert('Произошла ошибка при вставке текста: ' + error.message);
    }
  };

  // Подпись пола в заголовке
  const genderLabel = gender === 'male' ? 'мальчик' : 'девочка';
  
  // ИСПРАВЛЕНИЕ: правильная интерполяция строки
  const title = chronologicalAge 
    ? `Костный возраст (${genderLabel}) | Хронологический возраст: ${chronologicalAge}`
    : `Костный возраст (${genderLabel})`;

  // Текущий возраст
  const currentAge = imageData[currentIndex];

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="large"
      titleClassName="bg-white border-b border-gray-200"
      bodyClassName="p-0 bg-gray-50"
    >
      <div className="flex flex-col h-full">
        {/* Основное изображение с подписью возраста */}
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 flex-1 overflow-hidden">
          <div className="mb-4 text-lg font-medium text-gray-800">
            Возраст: {currentAge.label}
          </div>
          <img
            src={images[currentIndex]}
            alt={`Bone age ${genderLabel} ${currentAge.label}`}
            className="max-h-[600px] object-contain"
          />
        </div>

        {/* Навигация и кнопка добавления */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 flex-shrink-0 bg-white">
          <button
            onClick={handlePrev}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <div className="flex gap-4 items-center">
            <div className="flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition ${
                    index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <button
              onClick={handleAddToDescription}
              className="px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:bg-gray-300"
              disabled={!chronologicalAge}
            >
              Добавить
            </button>
          </div>

          <button
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export default BoneAgeModal;