import {
  UserIcon,
  MapPinIcon,
  DocumentTextIcon,
  ClipboardIcon,
  CheckIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import PatientResearchList from "./PatientResearchList";

export default function PatientCard({
  patient,
  researches = [],
  researchesByDate = null,
  formatBirthDate,
  focused,
  onClick,
  onCopy,
  copiedId,
  showActions = true,
  openModal,
  openEditModal,
  deletePatient,
  onEditResearch,
  onDeleteResearch,
  onIssueResearch,
  groupByDate = false, // новый проп для управления группировкой
}) {
  // Функция группировки исследований по дате
  const groupResearchesByDate = (researchList) => {
    const grouped = {};
    (researchList || []).forEach((r) => {
      const dateField = r.visit_date || r.research_date || r.date;
      const date = formatResearchDate(dateField);
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(r);
    });
    return grouped;
  };

  // Функция форматирования даты исследования
  const formatResearchDate = (dateString) => {
    if (!dateString) return "Без даты";
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  // Используем группировку только если groupByDate = true
  const groupedResearches = groupByDate 
    ? (researchesByDate || groupResearchesByDate(researches))
    : null;
  
  // Подсчёт общего количества исследований
  const totalResearches = groupByDate && groupedResearches
    ? Object.values(groupedResearches).flat().length 
    : researches.length;

  return (
    <div
      className="relative bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md overflow-hidden cursor-pointer"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      {/* Левая синяя полоса */}
      <div className="absolute left-0 top-0 h-full w-2 rounded-l-xl border-l-4 border-blue-500"></div>

      <div className="p-4 flex flex-col relative z-10">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1 flex-wrap">
            <UserIcon className="h-6 w-6 text-blue-500 mt-1" />
            <span className="text-gray-800 font-semibold mt-1">{patient.full_name}</span>
            <span className="text-gray-500 text-sm mt-1">
              {formatBirthDate?.(patient.birth_date)}
            </span>

            {onCopy && (
              <button
                onClick={onCopy}
                className="relative w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-transform ml-1 mt-1"
                title="Скопировать ФИО и ДР"
              >
                <ClipboardIcon
                  className={`h-5 w-5 absolute transition-all duration-300 transform ${
                    copiedId === patient.id ? "opacity-0 scale-75" : "opacity-100 scale-100"
                  }`}
                />
                <CheckIcon
                  className={`h-5 w-5 absolute text-green-500 transition-all duration-300 transform ${
                    copiedId === patient.id ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  }`}
                />
              </button>
            )}
          </div>

          {showActions && (
            <div className="flex items-center gap-2 mt-1">
              {openModal && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(patient.id);
                  }}
                  className="flex items-center gap-1 px-3 py-1 text-sm rounded border border-blue-500 text-blue-500 hover:bg-blue-50 hover:border-blue-400 font-medium"
                >
                  <PlusIcon className="h-4 w-4" />
                  Добавить исследование
                </button>
              )}

              {openEditModal && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openEditModal(patient);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>
              )}

              {deletePatient && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePatient(patient.id);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 mt-2 text-gray-500 text-sm">
          <MapPinIcon className="h-5 w-5 text-gray-400" />
          <span>{patient.adress}</span>
        </div>

        {totalResearches > 0 && (
          <div className="mt-3 flex items-center gap-2 text-gray-500 font-medium">
            <DocumentTextIcon className="h-5 w-5 text-gray-400" />
            <span>Исследования: {totalResearches}</span>
          </div>
        )}

        {/* Отображение с группировкой по датам */}
        {focused && groupByDate && totalResearches > 0 && (
          <div className="mt-4">
            {Object.entries(groupedResearches)
              .sort(([dateA], [dateB]) => {
                if (dateA === "Без даты") return 1;
                if (dateB === "Без даты") return -1;
                
                const parseDate = (dateStr) => {
                  if (dateStr === "Без даты") return new Date(0);
                  const [d, m, y] = dateStr.split(".");
                  return new Date(y, m - 1, d);
                };
                return parseDate(dateB) - parseDate(dateA);
              })
              .map(([date, researchList]) => (
                <div key={date} className="mb-4 last:mb-0">
                  <div className="text-sm text-gray-600 mb-3 font-medium bg-gray-50 px-3 py-2 rounded">
                    📅 {date}
                  </div>
                  
                  <div className="pl-4 border-l-2 border-gray-300">
                    <PatientResearchList
                      patientId={patient.id}
                      researches={researchList}
                      onDelete={onDeleteResearch}
                      onEdit={onEditResearch}
                      onIssue={onIssueResearch}
                    />
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* Отображение без группировки (обычный список) */}
        {focused && !groupByDate && researches.length > 0 && (
          <PatientResearchList
            patientId={patient.id}
            researches={researches}
            onDelete={onDeleteResearch}
            onEdit={onEditResearch}
            onIssue={onIssueResearch}
          />
        )}
      </div>
    </div>
  );
}
