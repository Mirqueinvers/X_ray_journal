// Frontend/src/components/Add_patient.jsx
import React, { useState, useEffect } from 'react';
import AddResearchModal from './AddResearchModal';
import AddPatientModal from './AddPatientModal';
import DayResult from './DayResult';
import EditPatientModal from './EditPatientModal';
import ResearchViewModal from './ResearchViewModal';
import VisitDatePicker from './VisitDatePicker';
import AddPatientButton from './AddPatientButton';
import EditResearchModal from './EditResearchModal';
import { useModal, useModalWithData } from './hooks/useModal';
import API_BASE from './api';

const AddPatient = () => {
  // Хуки для управления модалками
  const researchModal = useModalWithData();      // Для модалки описания исследования
  const addResearchModal = useModal();           // Для модалки добавления исследования
  const editPatientModal = useModalWithData();   // Для модалки редактирования пациента
  const editResearchModal = useModalWithData();  // Для модалки редактирования исследования

  // Для редактирования исследования (старые состояния для совместимости)
  const [editingResearch, setEditingResearch] = useState(null);
  const [formData, setFormData] = useState({});

  // Для добавления/редактирования пациента
  const [formDataPatient, setFormDataPatient] = useState({
    last_name: '',
    first_name: '',
    middle_name: '',
    birth_date: '',
    adress: '',
  });
  const [visitDate, setVisitDate] = useState('');
  const [patientsOnDate, setPatientsOnDate] = useState([]);
  const [visits, setVisits] = useState({}); // { patientId: visitId }
  const [showForm, setShowForm] = useState(false);
  const [modalPatientId, setModalPatientId] = useState(null);

  // Форма добавления исследования
  const [researchForm, setResearchForm] = useState({
    dsnapr: '',
    research_region: '',
    research_type: '',
    cassete_size: '',
    numb_of_proc: '',
    dose: '',
    sent: '',
  });

  const researchPlaceholders = {
    dsnapr: 'Направительный диагноз',
    research_region: 
    ['Органы грудной клетки','Верхние конечности','Нижние конечности', 'Шейный отдел позвоночника', 'Грудной отдел позвоночника', 
      'Поясничный отдел позвоночника', 'Тазобедренные суставы', 'Ребра и грудина', 'Череп, гол. мозг, ЧЛО', 'Органы брюшной полости', 
      'Почки, мочевыводящая система'],
    research_type: ['Рентген', 'Урография'],        
    cassete_size: ['13х18', '18х24', '24х30', '30х40', '35х35'], 
    numb_of_proc: ['1', '2', '3'],
    dose: 'Доза облучения',
    sent: ['Терапевт', 'Хирург', 'Невролог', 'Педиатр', 'ЛОР', 'Стоматолог', 'Женская консультация', 'Стационар дневной', 'Стационар круглосуточный', 'Приемный покой', 'ФЛ дообследование'],
  };  

  // Фокус на пациенте, чтобы раскрыть его исследования
  const [focusedPatientId, setFocusedPatientId] = useState(null);

  // Плейсхолдеры для форм
  const placeholdersPatient = {
    fio: 'ФИО',
    birth_date: 'Дата рождения (ДДММГГГГ)',
    adress: 'Адрес',
  };

  // НОВАЯ ФУНКЦИЯ: Открыть модалку описания исследования
  const openResearchDescriptionModal = (research) => {
    researchModal.openModal({
      id: research.id,
      research_type: research.research_type,
      description: research.description || "",
      patient_id: research.patient_id
    });
  };

  // НОВАЯ ФУНКЦИЯ: Открыть модалку редактирования исследования
  const openEditResearchModal = (research) => {
    editResearchModal.openModal({
      research: research,
      formData: research
    });
    setEditingResearch(research);
    setFormData(research);
  };

  const closeEditModal = () => {
    editResearchModal.closeModal();
    setEditingResearch(null);
  };

  // Обновленная функция редактирования пациента
  const openEditModal = (patient) => {
    editPatientModal.openModal({
      ...patient,
      formattedBirthDate: formatBirthDateForInput(patient.birth_date)
    });
  };

  // Обработчики изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { id, value } = e.target;
    // Обновляем данные в модалке редактирования пациента
    if (editPatientModal.modalData) {
      editPatientModal.setModalData({
        ...editPatientModal.modalData,
        [id]: value
      });
    }
  };

  const handleResearchChange = (e) => {
    const { name, value } = e.target;
    setResearchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePatientChange = (e) => {
    const { id, value } = e.target;
    setFormDataPatient((prev) => ({ ...prev, [id]: value }));
  };

  // Форматировать дату рождения для инпута редактирования (ДДММГГГГ)
  const formatBirthDateForInput = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}${month}${year}`;
  };

  // Форматировать дату рождения из ДДММГГГГ в YYYY-MM-DD
  const formatBirthDateForApi = (bd) => {
    const day = bd.slice(0, 2);
    const month = bd.slice(2, 4);
    const year = bd.slice(4, 8);
    return `${year}-${month}-${day}`;
  };

  // Форматировать дату для отображения (DD.MM.YYYY)
  const formatBirthDate = (bd) => {
    if (!bd) return '';
    if (bd.includes('-')) {
      const [year, month, day] = bd.split('-');
      return `${day}.${month}.${year}`;
    }
    return bd;
  };

  // Получить список пациентов и визитов по дате
  const fetchPatientsAndVisits = async (date) => {
    if (!date) {
      setPatientsOnDate([]);
      setVisits({});
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/api/patients-by-visit-date?visit_date=${date}`);
      const data = await res.json();
      if (data.success) {
        setPatientsOnDate(data.patients);
        const visitsMap = {};
        data.patients.forEach((p) => {
          visitsMap[p.id] = p.visit_id;
        });
        setVisits(visitsMap);
      } else {
        alert('Ошибка загрузки пациентов: ' + data.error);
      }
    } catch (e) {
      alert('Ошибка сети: ' + e.message);
    }
  };

  useEffect(() => {
    fetchPatientsAndVisits(visitDate);
    setFocusedPatientId(null);
  }, [visitDate]);

  // Добавить нового пациента с визитом
  const handleSubmit = async () => {
    if (!/^\d{8}$/.test(formDataPatient.birth_date)) {
      alert('Введите дату рождения в формате ДДММГГГГ (например, 12101990)');
      return;
    }
    if (!visitDate) {
      alert('Выберите дату визита');
      return;
    }

    const fio = `${formDataPatient.last_name || ''} ${formDataPatient.first_name || ''} ${formDataPatient.middle_name || ''}`.trim();
    if (!fio) {
      alert('Заполните Фамилию, Имя и Отчество');
      return;
    }
    if (!formDataPatient.adress) {
      alert('Заполните адрес');
      return;
    }

    const formattedBirthDate = formatBirthDateForApi(formDataPatient.birth_date);

    try {
      const response = await fetch(`${API_BASE}/api/add-patient-with-visit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fio,
          birth_date: formattedBirthDate,
          adress: formDataPatient.adress,
          visit_date: visitDate,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setFormDataPatient({
          last_name: '',
          first_name: '',
          middle_name: '',
          birth_date: '',
          adress: '',
        });
        setShowForm(false);

        // Открываем модалку добавления исследования
        addResearchModal.openModal();
        setModalPatientId(data.patientId);

        fetchPatientsAndVisits(visitDate);
      } else {
        alert('Ошибка: ' + data.error);
      }
    } catch (error) {
      alert('Ошибка сети: ' + error.message);
    }
  };

  // Сохранить изменения пациента
  const savePatientChanges = async () => {
    const patientData = editPatientModal.modalData;
    if (!patientData) return;

    if (!/^\d{8}$/.test(patientData.formattedBirthDate || '')) {
      alert('Введите дату рождения в формате ДДММГГГГ (например, 12101990)');
      return;
    }
    const formattedDate = formatBirthDateForApi(patientData.formattedBirthDate);

    const payload = {
      fio: patientData.full_name,
      birth_date: formattedDate,
      adress: patientData.adress,
    };

    try {
      const res = await fetch(`${API_BASE}/api/patient/${patientData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (res.ok && data?.success) {
        editPatientModal.closeModal();
        fetchPatientsAndVisits(visitDate);
      } else {
        alert(data?.error || text || 'Ошибка при обновлении');
      }
    } catch (error) {
      console.error('Ошибка:', error);
      alert('Ошибка сервера');
    }
  };

  // Открыть модалку добавления исследования для пациента
  const openModal = (patientId) => {
    addResearchModal.openModal();
    setModalPatientId(patientId);
  };

  // Закрыть модалку добавления исследования
  const closeModal = () => {
    addResearchModal.closeModal();
    setModalPatientId(null);
    setResearchForm({
      dsnapr: '',
      research_region: '',
      research_type: '',
      cassete_size: '',
      numb_of_proc: '',
      dose: '',
      sent: '',
    });
  };

  // Добавить исследование для пациента
  const saveResearch = async () => {
    const visit_id = visits[modalPatientId];
    if (!visit_id) {
      alert('Ошибка: Не найден визит для данного пациента и даты');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/add-research`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patient_id: modalPatientId,
          visit_id,
          ...researchForm,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFocusedPatientId(modalPatientId);
        closeModal();
        fetchPatientsAndVisits(visitDate);
      } else {
        alert('Ошибка: ' + data.error);
      }
    } catch (e) {
      alert('Ошибка сети: ' + e.message);
    }
  };

  // Удалить пациента
  const deletePatient = async (patientId) => {
    if (!window.confirm('Вы уверены, что хотите удалить этого пациента?')) return;

    try {
      const res = await fetch(`${API_BASE}/api/delete-patient/${patientId}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (data.success) {
        alert('Пациент удалён');
        fetchPatientsAndVisits(visitDate);
        if (focusedPatientId === patientId) {
          setFocusedPatientId(null);
        }
      } else {
        alert('Ошибка удаления: ' + data.error);
      }
    } catch (error) {
      alert('Ошибка сети: ' + error.message);
    }
  };

  const handleSave = async () => {
    if (!editingResearch) return;

    try {
      const res = await fetch(`${API_BASE}/api/research/${editingResearch.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        alert('Исследование успешно обновлено');
        closeEditModal();
        fetchPatientsAndVisits(visitDate);
      } else {
        alert('Ошибка: ' + data.error);
      }
    } catch (error) {
      alert('Ошибка сети: ' + error.message);
    }
  };

  // НОВАЯ функция: обработка сохранения описания исследования
  const handleDescriptionSaved = (updatedResearch) => {
    // Обновляем исследование в списке пациентов
    setPatientsOnDate(prev => 
      prev.map(patient => ({
        ...patient,
        researches: patient.researches.map(research =>
          research.id === updatedResearch.id 
            ? { ...research, description: updatedResearch.description }
            : research
        )
      }))
    );
    
    researchModal.closeModal();
  };

  return (
    <div className="flex flex-col items-center min-h-screen pt-10 px-4 mx-20">

      {/* Выбор даты визита */}
      <VisitDatePicker
        visitDate={visitDate}
        setVisitDate={setVisitDate}
        patientsOnDate={patientsOnDate}
      />

      {/* Список пациентов и их исследований на выбранную дату */}
      <DayResult
        visitDate={visitDate}
        patientsOnDate={patientsOnDate}
        setPatientsOnDate={setPatientsOnDate}
        focusedPatientId={focusedPatientId}
        setFocusedPatientId={setFocusedPatientId}
        openModal={openModal}
        openEditModal={openEditModal}
        deletePatient={deletePatient}
        formatBirthDate={formatBirthDate}
        fetchPatientsByDate={() => fetchPatientsAndVisits(visitDate)}
        onEditResearch={openResearchDescriptionModal} // Для описания исследования
        onEditResearchData={openEditResearchModal}    // НОВЫЙ ПРОПС для редактирования данных
      />

      {/* Модальное окно описания исследования */}
      <ResearchViewModal
        isOpen={researchModal.isOpen}
        onClose={researchModal.closeModal}
        researchId={researchModal.modalData?.id}
        description={researchModal.modalData?.description}
      />

      {/* Модальное окно редактирования пациента */}
      <EditPatientModal
        isOpen={editPatientModal.isOpen}
        onClose={editPatientModal.closeModal}
        formData={{
          fio: editPatientModal.modalData?.full_name || '',
          birth_date: editPatientModal.modalData?.formattedBirthDate || '',
          adress: editPatientModal.modalData?.adress || '',
        }}
        onChange={handleEditChange}
        onSave={savePatientChanges}
      />

      {/* Кнопка открытия формы добавления пациента */}
      {!showForm &&
        <AddPatientButton
          setShowForm={setShowForm}
        />
      }

      {/* Модальное окно добавления пациента */}
      <AddPatientModal
        showForm={showForm}
        setShowForm={setShowForm}
        formData={formDataPatient}
        placeholders={placeholdersPatient}
        handleChange={handlePatientChange}
        handleSubmit={handleSubmit}
      />

      {/* Модальное окно добавления исследования */}
      <AddResearchModal
        isOpen={addResearchModal.isOpen}
        closeModal={closeModal}
        modalPatientId={modalPatientId}
        researchForm={researchForm}
        researchPlaceholders={researchPlaceholders}
        handleResearchChange={handleResearchChange}
        saveResearch={saveResearch}
      />

      {/* Модальное окно редактирования исследования */}
      {editResearchModal.isOpen && (
        <EditResearchModal
          isOpen={editResearchModal.isOpen}
          researchData={formData}
          onChange={handleChange}
          onClose={closeEditModal}
          onSave={handleSave}
          researchPlaceholders={researchPlaceholders}
        />
      )}
    </div>
  );
};

export default AddPatient;