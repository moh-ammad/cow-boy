const ServiceDropdown = ({ value, onChange }) => {
  return (
    <div className="mb-6 max-w-sm">
      <label 
        htmlFor="service-select"
        className="block mb-2 text-indigo-400 font-semibold text-sm tracking-wide"
      >
        Choose Service:
      </label>
      <select
        id="service-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          px-4
          py-3
          rounded-lg
          bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900
          text-indigo-200
          border border-indigo-600
          shadow-md
          focus:outline-none
          focus:ring-2
          focus:ring-indigo-500
          transition
          duration-300
          ease-in-out
          hover:border-indigo-400
          cursor-pointer
          appearance-none
          relative
        "
      >
        <option value="rvm" className="bg-indigo-900 text-indigo-200">Cowboy RVM</option>
        <option value="vicidial" className="bg-indigo-900 text-indigo-200">Vicidial</option>
        <option value="mautic" className="bg-indigo-900 text-indigo-200">Mautic</option>
      </select>
    </div>
  );
};

export default ServiceDropdown;
