import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const BoneAgeModal = ({ isOpen, onClose, gender = 'male', chronologicalAge }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Названия картинок в правильном порядке
  const imageNames = [
    '8m', '10m', '12m', '1y2m', '1y4m', '1y6m', '1y8m', '2y', '2y4m', 
    '2y6m', '3y', '3y6m', '4y', '4y6m', '5y', '5y6m', '6y', '7y', '8y', 
     '9y', '10y', '11y', '12y', '13y', '14y', '15y', '16y', '17y', '18y'
  ];

  // Формируем путь с учетом пола
  const images = imageNames.map(name => `images/bone_age/${gender}/${name}.png`);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (!isOpen) return null;

  // Подпись пола в заголовке
  const genderLabel = gender === 'male' ? 'мальчик' : 'девочка';
  
  // Формируем заголовок с хронологическим возрастом если он есть
  const title = chronologicalAge 
    ? `Костный возраст ({genderLabel}) | Хронологический возраст: ${chronologicalAge}`
    : `Костный возраст ({genderLabel})`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Заголовок */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Основное изображение */}
        <div className="flex items-center justify-center p-6 bg-gray-50 overflow-hidden">
          <img
            src={images[currentIndex]}
            alt={`Bone age ${genderLabel} ${imageNames[currentIndex]}`}
            className="max-h-[600px] object-contain"
          />
        </div>

        {/* Навигация */}
        <div className="flex items-center justify-between p-4 border-t border-gray-200 flex-shrink-0">
          <button
            onClick={handlePrev}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

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
            onClick={handleNext}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoneAgeModal;