const InputField = ({ label, value, placeholder, onChange, icon }) => (
  <div className="mb-4">
    <label className="mb-1 font-medium flex items-center gap-2">
      {icon}
      {label}
    </label>
    <input
      type="number"
      className="border p-2 w-full rounded"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);
export default InputField;
