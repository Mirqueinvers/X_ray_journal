import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from '../api';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

// Регистрируем компоненты Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ReferralsChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Цвета для графика
  const COLORS = [
    "#FF6384",
    "#36A2EB", 
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FF6384",
    "#C9CBCF",
    "#4BC0C0",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF"
  ];

  useEffect(() => {
    fetchReferralsData();
  }, [startDate, endDate]);

  const fetchReferralsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE}/api/referrals-by-doctor`, {
        params: { startDate, endDate }
      });

      if (response.data.success) {
        setChartData(response.data.data);
      } else {
        setError('Ошибка загрузки данных');
      }
    } catch (err) {
      console.error('Ошибка загрузки направлений:', err);
      setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  // Подготовка данных для Chart.js
  const getChartData = () => {
    if (!chartData.length) return null;

    return {
      labels: chartData.map(item => item.name),
      datasets: [
        {
          label: 'Количество направлений',
          data: chartData.map(item => item.value),
          backgroundColor: COLORS.slice(0, chartData.length),
          borderColor: COLORS.slice(0, chartData.length).map(color => color + '80'),
          borderWidth: 2,
          hoverBorderWidth: 3,
        },
      ],
    };
  };

  // Настройки графика
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: {
            size: 12
          },
          boxWidth: 10,
          padding: 12,
          usePointStyle: true,
          generateLabels: (chart) => {
            const data = chart.data;
            if (data.labels.length && data.datasets.length) {
              return data.labels.map((label, i) => {
                const value = data.datasets[0].data[i];
                const percentage = ((value / data.datasets[0].data.reduce((a, b) => a + b, 0)) * 100).toFixed(1);
                return {
                  text: `${label} (${value} - ${percentage}%)`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  strokeStyle: data.datasets[0].borderColor[i],
                  lineWidth: data.datasets[0].borderWidth,
                  hidden: false,
                  index: i
                };
              });
            }
            return [];
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} направлений (${percentage}%)`;
          }
        },
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1
      }
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10
      }
    }
  };

  // Общая статистика
  const totalReferrals = chartData.reduce((sum, item) => sum + item.value, 0);
  const totalDoctors = chartData.length;

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Направления от врачей
        </h3>
        <div className="flex items-center justify-center h-80">
          <div className="text-gray-500">Загрузка данных...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Направления от врачей
        </h3>
        <div className="flex items-center justify-center h-80">
          <div className="text-red-500">Ошибка: {error}</div>
        </div>
      </div>
    );
  }

  if (!chartData.length) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Направления от врачей
        </h3>
        <div className="flex items-center justify-center h-80">
          <div className="text-gray-500">Нет данных для отображения</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Направления от врачей
        </h3>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{totalReferrals}</span> направлений от{' '}
          <span className="font-medium">{totalDoctors}</span> врачей
        </div>
      </div>

      <div className="h-80 w-full">
        <Pie data={getChartData()} options={chartOptions} />
      </div>

      {/* Дополнительная статистика */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Топ-3 врача:</span>
            <ul className="mt-1">
              {chartData.slice(0, 3).map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span className="text-gray-800 truncate mr-2">{item.name}</span>
                  <span className="font-medium">{item.value}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <span className="text-gray-600">Период:</span>
            <div className="mt-1 text-gray-800">
              {startDate ? new Date(startDate).toLocaleDateString('ru-RU') : 'Начало'} -{' '}
              {endDate ? new Date(endDate).toLocaleDateString('ru-RU') : 'сегодня'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}