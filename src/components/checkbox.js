import PropTypes from "prop-types";

const Checkbox = ({ className = "" }) => {
  return (
    <div
      className={`w-[332px] h-[155px] shadow-[-4px_3px_0px_#1e3e8a] rounded-[10px] bg-[#f3f4f6] border-[#1e3e8a] border-solid border-[3px] box-border overflow-hidden flex items-start justify-around pl-[15px] pt-1.5 pr-[15px] gap-[15px] z-[0] text-left text-3xl text-[#1e3e8a] font-['Special_Gothic_Condensed_One'] ${className}`}
    >
      <div className="h-[149px] flex-1 flex flex-col items-start pb-[26px] box-border gap-[3px] z-[0] shrink-0">
        <h2 className="m-0 w-[145px] relative text-[length:inherit] leading-[120%] font-normal font-[inherit] flex items-center z-[0] shrink-0">
          Nama Gejala
        </h2>
        <div className="self-stretch relative text-lg leading-[120%] font-[Poppins] text-justify z-[0] shrink-0">
          Difitnah saya diam. Dihina saya diam. Kali ini di Jogja saya akan
          lawan.
        </div>
      </div>
      <input
        className="m-0 h-[47px] w-[47px] relative rounded-[5px] border-[#1e3e8a] border-solid border-[3px] box-border z-[0] shrink-0"
        type="checkbox"
      />
    </div>
  );
};

Checkbox.propTypes = {
  className: PropTypes.string,
};

export default Checkbox;
