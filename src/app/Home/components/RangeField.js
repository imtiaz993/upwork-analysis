const RangeField = ({
  label,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  icon,
}) => (
  <div className="mb-4">
    <label className="mb-1 font-medium flex items-center gap-2">
      {icon}
      {label}
    </label>
    <div className="flex gap-2">
      <input
        type="number"
        className="border p-2 w-1/2 rounded"
        placeholder="Min"
        value={minValue}
        onChange={(e) => onMinChange(e.target.value)}
      />
      <input
        type="number"
        className="border p-2 w-1/2 rounded"
        placeholder="Max"
        value={maxValue}
        onChange={(e) => onMaxChange(e.target.value)}
      />
    </div>
  </div>
);

export default RangeField;
