export default function DesignInput({
  label,
  name,
  placeholder,
  type = "text",
  inputMode,
  error,
  maxLength,
  min,
  max,
  required = false,
  value,
  onChange,
}) {
  const inputId = `profile-${name}`;
  const errorId = `${inputId}-error`;

  return (
    <label className="flex flex-col items-start font-poppins text-base font-normal leading-[120%] text-[#1e3e8a]">
      <span className="mb-1">{label}</span>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        className={`w-full rounded-[5px] border-[3px] bg-[#f3f4f6] px-[15px] py-1.5 font-poppins text-lg font-normal leading-[120%] text-[#1e3e8a] outline-none placeholder:text-[#60a5fa] ${
          error
            ? "border-[#dc2626] focus:border-[#dc2626]"
            : "border-[#1e3e8a] focus:border-[#60a5fa]"
        }`}
        id={inputId}
        inputMode={inputMode}
        max={max}
        maxLength={maxLength}
        min={min}
        name={name}
        placeholder={placeholder}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error ? (
        <span
          className="mt-1 text-sm font-medium leading-[130%] text-[#dc2626]"
          id={errorId}
          role="alert"
        >
          {error}
        </span>
      ) : null}
    </label>
  );
}
