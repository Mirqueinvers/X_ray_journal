import React, { useState, useEffect } from "react";
import axios from "axios";
import API_BASE from '../api';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Регистрируем компоненты Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PatientsByMonthChart({ startDate, endDate }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatientsData();
  }, [startDate, endDate]);

  const fetchPatientsData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(`${API_BASE}/api/patients-by-month`, {
        params: { startDate, endDate }
      });

      if (response.data.success) {
        setChartData(response.data.data);
      } else {
        setError('Ошибка загрузки данных');
      }
    } catch (err) {
      console.error('Ошибка загрузки статистики по месяцам:', err);
      setError('Ошибка загрузки данных');
    } finally {
      setLoading(false);
    }
  };

  // Подготовка данных для графика
  const getChartData = () => {
    if (!chartData.length) return null;

    return {
      labels: chartData.map(item => item.monthName),
      datasets: [
        {
          label: 'Уникальные пациенты',
          data: chartData.map(item => item.uniquePatients),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        }
      ],
    };
  };

  // Настройки графика
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          afterBody: (context) => {
            const dataIndex = context[0].dataIndex;
            const month = chartData[dataIndex];
            return [
              `Рабочих дней: ${month.workingDays}`,
              `Всего исследований: ${month.totalResearches}`,
              `Среднее в день: ${(month.uniquePatients / month.workingDays).toFixed(1)} пациентов`
            ];
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
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Количество пациентов'
        }
      },

    }
  };

  // Общая статистика
  const totalPatients = chartData.reduce((sum, item) => sum + item.uniquePatients, 0);
  const totalMonths = chartData.length;
  const avgPatientsPerMonth = totalMonths > 0 ? (totalPatients / totalMonths).toFixed(1) : 0;

  // Копии данных для топ-3 (создаем копии, чтобы не изменять исходный массив)
  const topMonthsHighest = [...chartData]
    .sort((a, b) => b.uniquePatients - a.uniquePatients)  // По убыванию (наибольшие сначала)
    .slice(0, 3);

  const topMonthsLowest = [...chartData]
    .sort((a, b) => a.uniquePatients - b.uniquePatients)  // По возрастанию (наименьшие сначала)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          Количество пациентов по месяцам
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
          Количество пациентов по месяцам
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
          Количество пациентов по месяцам
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
          Количество пациентов по месяцам
        </h3>
        <div className="text-sm text-gray-600">
          <span className="font-medium">{totalPatients}</span> пациентов за{' '}
          <span className="font-medium">{totalMonths}</span> месяцев
        </div>
      </div>

      <div className="h-80 w-full">
        <Bar data={getChartData()} options={chartOptions} />
      </div>

      {/* Дополнительная статистика */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Общая статистика:</span>
            <div className="mt-1 space-y-1 text-sm">
              <div>Всего пациентов: <span className="font-medium">{totalPatients}</span></div>
              <div>Среднее в месяц: <span className="font-medium">{avgPatientsPerMonth}</span></div>
              <div>Период: <span className="font-medium">{chartData.length} мес.</span></div>
            </div>
          </div>
          <div>
            <span className="text-gray-600">Топ-3 (наибольшее):</span>
            <div className="mt-1 space-y-1">
              {topMonthsHighest.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-gray-800 truncate mr-2">{item.monthName}:</span>
                  <span className="font-medium">{item.uniquePatients}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <span className="text-gray-600">Топ-3 (наименьшее):</span>
            <div className="mt-1 space-y-1">
              {topMonthsLowest.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-gray-800 truncate mr-2">{item.monthName}:</span>
                  <span className="font-medium">{item.uniquePatients}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}