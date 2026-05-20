export default function SymptomCard({
  title,
  description,
  checked = false,
  onChange,
}) {
  return (
    <label
      className={`symptom-card group flex min-h-[155px] cursor-pointer items-start justify-between gap-[15px] rounded-[10px] border-[3px] px-[15px] py-1.5 text-left shadow-[-4px_3px_0_#1e3e8a] transition-all duration-200 ease-out active:-translate-x-[2px] active:translate-y-[2px] active:shadow-none ${
        checked
          ? "border-[#1e3e8a] bg-[#60a5fa] text-[#f3f4f6] hover:bg-[#5499ea]"
          : "border-[#1e3e8a] bg-[#f3f4f6] text-[#1e3e8a] hover:border-[#60a5fa] hover:text-[#60a5fa] hover:shadow-[-4px_3px_0_#60a5fa]"
      }`}
    >
      <span className="flex flex-1 flex-col gap-[3px]">
        <span className="font-display text-3xl leading-[120%]">{title}</span>
        <span className="font-poppins text-lg leading-[120%] text-justify">
          {description}
        </span>
      </span>
      <input
        checked={checked}
        className="sr-only"
        type="checkbox"
        onChange={onChange}
      />
      <span
        className={`symptom-card-check relative mt-1 grid h-[47px] w-[47px] shrink-0 place-items-center rounded-[5px] border-[3px] transition-all duration-200 ease-out ${
          checked
            ? "border-[#1e3e8a] bg-[#f3f4f6] text-[#1e3e8a]"
            : "border-[#1e3e8a] bg-[#60a5fa] group-hover:border-[#60a5fa] group-hover:bg-[#f3f4f6]"
        }`}
      >
        {checked ? (
          <span className="relative right-[1px] h-[38px] w-[38px]">
            <span className="absolute left-1/2 top-1/2 h-[5px] w-[54px] -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#1e3e8a]" />
            <span className="absolute left-1/2 top-1/2 h-[5px] w-[54px] -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#1e3e8a]" />
          </span>
        ) : null}
      </span>
    </label>
  );
}
