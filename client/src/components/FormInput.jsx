const FormInput = ({
  type = "text",
  name,
  label,
  value,
  defaultValue,
  placeholder,
  accept,
  required,
  disabled,
  handleChange,
}) => {
  return (
    <div className="grid gap-2">
      <label
        htmlFor={name}
        className={`text-lg font-medium capitalize ${
          required
            ? 'block after:ml-0.5 after:text-red-500 after:content-["*"]'
            : ""
        }`}
      >
        {label || name}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        accept={accept}
        required={required}
        disabled={disabled}
        onChange={handleChange}
        className={`rounded-full border bg-white px-5 py-2 disabled:cursor-not-allowed disabled:opacity-70 ${
          name === "firstName" || name === "lastName" || name === "company"
            ? "capitalize"
            : ""
        }`}
      />
    </div>
  );
};

export default FormInput;
