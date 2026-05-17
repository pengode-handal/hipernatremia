import Image from "next/image";
import PropTypes from "prop-types";

const Board1 = ({ className = "" }) => {
  return (
    <section
      className={`self-center w-full rounded-[5px] bg-[#f3f4f6] border-[#22c55e] border-solid border-[3px] box-border overflow-hidden flex flex-col items-center py-1.5 px-3 gap-[5px] z-[0] text-left text-[25px] text-[#22c55e] font-['Special_Gothic_Condensed_One'] ${className}`}
    >
      <div className="self-stretch h-[226px] rounded-[5px] bg-[#fff] overflow-hidden flex flex-col items-center justify-center py-3.5 px-[15px] box-border gap-0.5 z-[0]">
        <Image
          className="w-[41.4px] h-[54.3px] relative z-[0]"
          loading="lazy"
          width={41.4}
          height={54.3}
          sizes="100vw"
          alt=""
          src="/LogoGreen.svg"
        />
        <div className="relative leading-[120%] capitalize flex items-center h-[30px] shrink-0 z-[0] mq450:text-xl mq450:leading-6">
          Risiko Rendah
        </div>
        <div className="flex flex-col items-center z-[0] text-5xl text-[#1e3e8a]">
          <div className="relative leading-[120%] uppercase flex items-center h-[58px] shrink-0 z-[0]">
            0-100 mEQ/L
          </div>
          <div className="relative text-3xl leading-[120%] uppercase flex items-center h-9 shrink-0 z-[0]">
            Hipernatremia rendah
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start pt-2.5 pb-2.5 gap-[5px] z-[0] text-[#1e3e8a]">
        <div className="flex items-center gap-[5px] z-[0]">
          <div className="h-[38px] w-[38px] relative z-[0]">
            <Image
              className="absolute top-[4.8px] left-[3.6px] w-[30.9px] h-[29.7px]"
              width={30.9}
              height={29.7}
              sizes="100vw"
              alt=""
              src="/svg-path4.svg"
            />
            <div className="absolute top-[0px] left-[0px] bg-[#1e3e8a] w-full h-full hidden" />
          </div>
          <div className="relative leading-[120%] capitalize flex items-center h-[30px] z-[0] mq450:text-xl mq450:leading-6">
            Saran
          </div>
        </div>
        <div className="self-stretch relative text-base leading-[120%] capitalize font-[Poppins] text-justify z-[0]">
          Dan dirikanlah shalat, tunaikanlah zakat dan ruku' lah beserta
          orang-orang yang ruku
        </div>
      </div>
    </section>
  );
};

Board1.propTypes = {
  className: PropTypes.string,
};

export default Board1;
