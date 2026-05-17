export default function DesignInput({
  label,
  name,
  placeholder,
  type = "text",
  inputMode,
  value,
  onChange,
}) {
  return (
    <label className="flex flex-col items-start font-poppins text-base font-normal leading-[120%] text-[#1e3e8a]">
      <span className="mb-1">{label}</span>
      <input
        className="w-full rounded-[5px] border-[3px] border-[#1e3e8a] bg-[#f3f4f6] px-[15px] py-1.5 font-poppins text-lg font-normal leading-[120%] text-[#1e3e8a] outline-none placeholder:text-[#60a5fa]"
        inputMode={inputMode}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
