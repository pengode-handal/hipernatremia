"use client";
import { useMemo } from "react";
import PropTypes from "prop-types";

const Fillin = ({
  className = "",
  nama,
  namaHeight,
  inputPadding,
  inputWidth,
  placeholder,
}) => {
  const namaStyle = useMemo(() => {
    return {
      height: namaHeight,
    };
  }, [namaHeight]);

  const inputStyle = useMemo(() => {
    return {
      padding: inputPadding,
      width: inputWidth,
    };
  }, [inputPadding, inputWidth]);

  return (
    <div
      className={`flex flex-col items-start z-[0] text-left text-base text-[#1e3e8a] font-[Poppins] ${className}`}
    >
      <div
        className="relative leading-[120%] font-medium inline-block h-5 shrink-0 z-[0]"
        style={namaStyle}
      >
        {nama}
      </div>
      <div
        className="w-[298px] rounded-[5px] bg-[#f3f4f6] border-[#1e3e8a] border-solid border-[3px] box-border flex items-start py-1.5 pl-[15px] pr-[65px] z-[0]"
        style={inputStyle}
      >
        <input
          className="w-full [border:none] [outline:none] font-[Poppins] text-lg bg-[transparent] relative leading-[120%] text-[#60a5fa] text-left inline-block p-0 z-[0]"
          placeholder={placeholder}
          type="text"
        />
      </div>
    </div>
  );
};

Fillin.propTypes = {
  className: PropTypes.string,
  nama: PropTypes.string,
  placeholder: PropTypes.string,

  /** Style props */
  namaHeight: PropTypes.string,
  inputPadding: PropTypes.string,
  inputWidth: PropTypes.string,
};

export default Fillin;
