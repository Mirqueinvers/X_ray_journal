export default function AddPatientButton({ setShowForm }) {

return (
  <button
    onClick={() => setShowForm(true)}
    className="bg-gray-700 border border-yellow-500 text-yellow-300 
               font-bold shadow-lg shadow-yellow-500/30 rounded-full 
               w-[500px] h-16 flex items-center justify-center text-xl 
               hover:bg-yellow-500 hover:text-black hover:shadow-yellow-500/60 
               transition-all duration-300 ease-in-out mb-8"
    aria-label="Добавить пациента"
  >
    Добавить пациента
  </button>
);
}
