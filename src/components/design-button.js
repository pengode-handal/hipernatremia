const colorClasses = {
  blue:
    "border-[#1e3e8a] text-[#1e3e8a] shadow-[-4px_3px_0_#1e3e8a] hover:border-[#60a5fa] hover:text-[#60a5fa] hover:shadow-[-4px_3px_0_#60a5fa] active:border-[#60a5fa] active:bg-[#60a5fa] active:text-white",
  green:
    "border-[#22c55e] text-[#22c55e] shadow-[-4px_3px_0_#22c55e] hover:border-[#60a5fa] hover:text-[#60a5fa] hover:shadow-[-4px_3px_0_#60a5fa] active:border-[#22c55e] active:bg-[#22c55e] active:text-white",
  red:
    "border-[#ef4444] text-[#ef4444] shadow-[-4px_3px_0_#ef4444] hover:border-[#60a5fa] hover:text-[#60a5fa] hover:shadow-[-4px_3px_0_#60a5fa] active:border-[#ef4444] active:bg-[#ef4444] active:text-white",
};

const iconClasses = {
  red: "group-hover:rotate-180 group-active:rotate-[360deg]",
};

export default function DesignButton({
  children,
  className = "",
  color = "blue",
  icon,
  iconClassName = "",
  type = "button",
  onClick,
}) {
  return (
    <button
      className={`group inline-flex min-h-10 items-center justify-center gap-[15px] rounded-[10px] border-[3px] bg-[#f3f4f6] px-3 py-1.5 font-poppins text-lg leading-[120%] transition-all duration-200 ease-out hover:bg-white active:translate-x-[-2px] active:translate-y-[2px] active:shadow-none ${
        colorClasses[color] || colorClasses.blue
      } ${className}`}
      type={type}
      onClick={onClick}
    >
      <span className="whitespace-nowrap">{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className={`h-5 w-5 bg-current transition-transform duration-300 ease-out ${
            iconClasses[color] || ""
          } ${iconClassName}`}
          style={{
            WebkitMask: `url(${icon}) center / contain no-repeat`,
            mask: `url(${icon}) center / contain no-repeat`,
          }}
        />
      ) : null}
    </button>
  );
}
