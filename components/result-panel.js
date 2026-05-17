import Image from "next/image";

export default function ResultPanel({
  color = "green",
  logo,
  category,
  range,
  label,
  advice,
  adviceIcon,
}) {
  const accent =
    color === "green" ? "#22c55e" : color === "red" ? "#ef4444" : "#60a5fa";

  return (
    <section
      className="w-[462px] rounded-[5px] border-[3px] bg-[#f3f4f6] p-1.5"
      style={{ borderColor: accent, color: accent }}
    >
      <div className="flex min-h-[226px] flex-col items-center justify-center rounded-[5px] bg-white px-[15px] py-3.5 text-center font-display">
        <Image alt="" className="h-[54px] w-auto" height={54} src={logo} width={42} />
        <p className="mt-1 text-[25px] leading-[120%] capitalize">{category}</p>
        <p className="mt-1 text-5xl leading-[120%] text-[#1e3e8a]">{range}</p>
        <p className="text-3xl leading-[120%] text-[#1e3e8a]">{label}</p>
      </div>
      <div className="px-1 py-2.5 text-[#1e3e8a]">
        <div className="flex items-center gap-[5px]">
          {adviceIcon ? (
            <Image alt="" className="h-[30px] w-[31px]" height={30} src={adviceIcon} width={31} />
          ) : null}
          <h2 className="m-0 font-display text-[25px] leading-[120%]">Saran</h2>
        </div>
        <p className="mt-[5px] text-justify font-poppins text-base leading-[120%]">
          {advice}
        </p>
      </div>
    </section>
  );
}
