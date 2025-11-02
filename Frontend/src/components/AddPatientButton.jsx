export default function AddPatientButton({ setShowForm }) {

return (
  <button
    onClick={() => setShowForm(true)}
    className="bg-gray-100 border border-gray-500 text-gray-500 
               font-bold shadow-lg shadow-gray-500/30 rounded-full 
               w-[500px] h-16 flex items-center justify-center text-xl 
               hover:bg-black hover:text-white hover:shadow-gray-500/60 
               transition-all duration-300 ease-in-out mb-8"
    aria-label="Добавить пациента"
  >
    Добавить пациента
  </button>
);
}
