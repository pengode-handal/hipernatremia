"use client";
import { useState } from "react";
import Image from "next/image";
import Fillin from "./fillin";
import PropTypes from "prop-types";

const Board2 = ({ className = "" }) => {
  const [fillinItems] = useState([
    {
      nama: "Nama",
      namaHeight: "",
      inputPadding: "6px 65px 6px 15px",
      inputWidth: "",
      placeholder: "Masukkan nama anda",
    },
    {
      nama: "Berat Badan",
      namaHeight: "20px",
      inputPadding: "6px 13px 6px 15px",
      inputWidth: "298px",
      placeholder: "Dalam satuan kg (kilogram)",
    },
    {
      nama: "Umur",
      namaHeight: "20px",
      inputPadding: "6px 71px 6px 15px",
      inputWidth: "298px",
      placeholder: "Masukkan umur anda",
    },
  ]);
  return (
    <section
      className={`self-center flex flex-col items-start gap-[50.3px] z-[0] shrink-0 text-left text-base text-[#1e3e8a] font-[Poppins] ${className}`}
    >
      {fillinItems.map((item, index) => (
        <Fillin
          key={index}
          nama={item.nama}
          namaHeight={item.namaHeight}
          inputPadding={item.inputPadding}
          inputWidth={item.inputWidth}
          placeholder={item.placeholder}
        />
      ))}
      <div className="flex flex-col items-start z-[0]">
        <div className="relative leading-[120%] font-medium inline-block h-5 shrink-0 z-[0]">
          Jenis Kelamin
        </div>
        <div className="w-[298px] shadow-[-4px_3px_0px_#1e3e8a] rounded-[10px] bg-[#f3f4f6] border-[#1e3e8a] border-solid border-[3px] box-border flex items-start justify-around py-1.5 px-[15px] gap-[15px] z-[0] text-lg">
          <div className="relative leading-[120%] flex items-center h-[22px] z-[0]">
            Pilih jenis kelamin
          </div>
          <Image
            className="h-6 w-6 relative z-[0]"
            width={24}
            height={24}
            sizes="100vw"
            alt=""
            src="/svg5.svg"
          />
        </div>
      </div>
    </section>
  );
};

Board2.propTypes = {
  className: PropTypes.string,
};

export default Board2;
