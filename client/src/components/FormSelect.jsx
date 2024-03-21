import { HiMiniChevronDown } from "react-icons/hi2";

const FormSelect = ({
  name,
  label,
  optionValues,
  value,
  required,
  className,
  handleChange,
  disabled,
}) => {
  return (
    <div className={`grid gap-2 ${className}`}>
      <label
        htmlFor={name}
        className={`text-lg font-medium capitalize ${
          required ? 'after:ml-0.5 after:text-red-500 after:content-["*"]' : ""
        }`}
      >
        {label || name}
      </label>
      <div className="relative">
        <select
          name={name}
          id={name}
          required={required}
          value={value}
          className="w-full rounded-full border bg-white px-4 py-2 capitalize disabled:cursor-not-allowed disabled:opacity-70"
          onChange={handleChange}
          disabled={disabled}
        >
          {optionValues.map((optionValue) => (
            <option value={optionValue} key={optionValue}>
              {optionValue}
            </option>
          ))}
        </select>
        <span className="absolute right-4 top-2/4 -translate-y-2/4">
          <HiMiniChevronDown />
        </span>
      </div>
    </div>
  );
};

export default FormSelect;
