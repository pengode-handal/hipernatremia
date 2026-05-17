"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DesignButton from "../../components/design-button";
import DesignInput from "../../components/design-input";
import MobileFrame from "../../components/mobile-frame";
import PageTitle from "../../components/page-title";
import StepIndicator from "../../components/step-indicator";

const emptyProfile = {
  name: "",
  weight: "",
  age: "",
  gender: "",
};

const genderOptions = [
  { label: "Pria", value: "male" },
  { label: "Perempuan", value: "female" },
];

const MobileInfo = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(emptyProfile);
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  function selectGender(value) {
    setProfile((current) => ({ ...current, gender: value }));
    setIsGenderOpen(false);
  }

  const selectedGender = genderOptions.find(
    (option) => option.value === profile.gender,
  );

  return (
    <MobileFrame className="items-center justify-between gap-10">
      <PageTitle
        icon={
          <Image
            alt=""
            className="h-[51px] w-[44px]"
            height={51}
            src="/svg3.svg"
            width={44}
          />
        }
      >
        Masukkan Data Anda
      </PageTitle>

      <form className="flex w-full max-w-[298px] flex-col gap-[38px]">
        <DesignInput
          label="Nama"
          name="name"
          placeholder="Masukkan nama anda"
          value={profile.name}
          onChange={handleChange}
        />
        <DesignInput
          label="Berat Badan"
          name="weight"
          placeholder="Dalam satuan kg (kilogram)"
          inputMode="numeric"
          value={profile.weight}
          onChange={handleChange}
        />
        <DesignInput
          label="Umur"
          name="age"
          placeholder="Masukkan umur anda"
          inputMode="numeric"
          value={profile.age}
          onChange={handleChange}
        />
        <label className="flex flex-col items-start font-poppins text-base font-normal leading-[120%] text-[#1e3e8a]">
          <span className="mb-1">Jenis Kelamin</span>
          <span className="relative w-full">
            <button
              aria-expanded={isGenderOpen}
              className="flex w-full items-center rounded-[10px] border-[3px] border-[#1e3e8a] bg-[#f3f4f6] py-1.5 pl-[35px] pr-[58px] text-left font-poppins text-lg font-normal leading-[120%] text-[#1e3e8a] shadow-[-4px_3px_0_#1e3e8a] outline-none"
              type="button"
              onClick={() => setIsGenderOpen((current) => !current)}
            >
              {selectedGender?.label || "Pilih jenis kelamin"}
            </button>
            <span
              className={`pointer-events-none absolute right-[34px] top-[10px] h-[16px] w-[16px] rotate-45 border-b-[3px] border-r-[3px] border-[#1e3e8a] transition-transform duration-200 ease-out ${
                isGenderOpen ? "-translate-y-[1px] rotate-[225deg]" : ""
              }`}
            />
            <div
              className={`absolute left-0 right-0 top-[calc(100%+6px)] z-10 overflow-hidden rounded-[8px] border-[3px] border-[#1e3e8a] bg-[#f3f4f6] font-poppins text-lg font-normal leading-[120%] text-[#1e3e8a] shadow-[-3px_3px_0_#1e3e8a] transition-all duration-200 ease-out origin-top ${
                isGenderOpen
                  ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
                  : "pointer-events-none -translate-y-2 scale-y-95 opacity-0"
              }`}
            >
              <div>
                {genderOptions.map((option, index) => (
                  <button
                    className={`block w-full px-[35px] py-[9px] text-left transition-colors duration-150 hover:bg-[#60a5fa] hover:text-white ${
                      index > 0 ? "border-t border-[#1e3e8a]" : ""
                    }`}
                    key={option.value}
                    type="button"
                    onClick={() => selectGender(option.value)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </span>
        </label>
      </form>

      <div className="flex w-full flex-col items-center gap-[36px]">
        <div className="flex w-full max-w-[408px] items-center justify-around gap-2">
          <DesignButton
            color="red"
            icon="/svg4.svg"
            onClick={() => {
              setProfile(emptyProfile);
              setIsGenderOpen(false);
            }}
          >
            Set Ulang
          </DesignButton>
          <DesignButton
            color="green"
            icon="/svg-path2.svg"
            onClick={() => router.push("/mobile-check-pressed")}
          >
            Selanjutnya
          </DesignButton>
        </div>

        <StepIndicator current={2} total={6} />
      </div>
    </MobileFrame>
  );
};

export default MobileInfo;
