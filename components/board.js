import Image from "next/image";
import Checkbox from "./checkbox";
import PropTypes from "prop-types";

const Board = ({ className = "" }) => {
  return (
    <section
      className={`self-center flex flex-col items-end gap-5 z-[0] text-left text-3xl text-[#1e3e8a] font-['Special_Gothic_Condensed_One'] ${className}`}
    >
      <Checkbox />
      <Checkbox />
      <div className="overflow-hidden flex items-start pt-[3px] pr-1 z-[0] text-[#f3f4f6]">
        <div className="h-[155px] w-[332px] rounded-[10px] bg-[#60a5fa] border-[#1e3e8a] border-solid border-[3px] box-border overflow-hidden flex items-start justify-around pl-[15px] pt-1.5 pr-[15px] gap-[15px] z-[0]">
          <div className="relative rounded-[5px] bg-[#60a5fa] border-[#1e3e8a] border-solid border-[3px] box-border w-[47px] h-[47px] hidden z-[0] shrink-0" />
          <div className="h-[149px] w-[225px] flex flex-col items-start pb-12 box-border gap-[3px] z-[0] shrink-0">
            <h2 className="m-0 w-[145px] relative text-[length:inherit] leading-[120%] font-normal font-[inherit] flex items-center z-[0] shrink-0">
              Nama Gejala
            </h2>
            <div className="self-stretch relative text-lg leading-[120%] font-[Poppins] text-justify z-[0] shrink-0">
              Deskripsi gejala, nanti tulisannya panjang perparagraf gitu.
            </div>
          </div>
          <div className="h-[47px] w-[47px] relative shrink-0">
            <Image
              className="absolute h-[80.85%] w-[80.85%] top-[9.57%] right-[9.57%] bottom-[9.57%] left-[9.57%] max-w-full overflow-hidden max-h-full"
              loading="lazy"
              width={38}
              height={38}
              sizes="100vw"
              alt=""
              src="/svg.svg"
            />
            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[5px] bg-[#f3f4f6] border-[#1e3e8a] border-solid border-[3px] box-border z-[1]" />
          </div>
        </div>
      </div>
    </section>
  );
};

Board.propTypes = {
  className: PropTypes.string,
};

export default Board;
