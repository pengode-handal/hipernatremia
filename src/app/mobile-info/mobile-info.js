"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DesignButton from "../../components/design-button";
import DesignInput from "../../components/design-input";
import MobileFrame from "../../components/mobile-frame";
import PageTitle from "../../components/page-title";
import StepIndicator from "../../components/step-indicator";
import { useQuizStore } from "@/hooks/useQuizStore";

const emptyProfile = {
    name: "",
    weight: "",
    age: "",
    gender: "",
    height: "",
};

const genderOptions = [
    { label: "Pria", value: "male" },
    { label: "Perempuan", value: "female" },
];

const MobileInfo = () => {
    const router = useRouter();
    const [isGenderOpen, setIsGenderOpen] = useState(false);
    const { hydrated, answers, saveMultipleAnswers } = useQuizStore();

    const [profile, setProfile] = useState(emptyProfile);

    const displayProfile = {
        name: profile.name || (hydrated ? (answers.name ?? "") : ""),
        weight: profile.weight || (hydrated ? (answers.weight ?? "") : ""),
        age: profile.age || (hydrated ? (answers.age ?? "") : ""),
        gender: profile.gender || (hydrated ? (answers.gender ?? "") : ""),
        height: profile.height || (hydrated ? (answers.height ?? "") : ""),
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setProfile((current) => ({ ...current, [name]: value }));
    }

    function selectGender(value) {
        setProfile((current) => ({ ...current, gender: value }));
        setIsGenderOpen(false);
    }

    function handleReset() {
        setProfile(emptyProfile);
        setIsGenderOpen(false);
    }

    function handleNext() {
        if (
            !displayProfile.name.trim() ||
            !displayProfile.weight ||
            !displayProfile.age ||
            !displayProfile.gender ||
            !displayProfile.height
        ) {
            return;
        }
        saveMultipleAnswers(
            {
                name: displayProfile.name.trim(),
                weight: displayProfile.weight,
                beratBadan: displayProfile.weight,
                age: displayProfile.age,
                umur: displayProfile.age,
                gender: displayProfile.gender,
                height: displayProfile.height,
                tinggiBadan: displayProfile.height,
            },
            0,
        );
        router.push("/mobile-quiz/1");
    }

    const selectedGender = genderOptions.find(
        (option) => option.value === displayProfile.gender,
    );

    return (
        <MobileFrame className="mobile-info-frame items-center justify-between gap-10">
            <PageTitle
                icon={
                    <Image
                        alt=""
                        className="h-[51px] w-[44px]"
                        height={51}
                        src="/svg3.svg"
                        width={44}
                    />
                }>
                Masukkan Data Anda
            </PageTitle>

            <div className="mobile-info-form flex w-full max-w-[298px] flex-col gap-[38px]">
                <DesignInput
                    label="Nama"
                    name="name"
                    placeholder="Masukkan nama anda"
                    value={displayProfile.name}
                    onChange={handleChange}
                />
                <DesignInput
                    label="Berat Badan"
                    name="weight"
                    placeholder="Dalam satuan kg (kilogram)"
                    inputMode="numeric"
                    value={displayProfile.weight}
                    onChange={handleChange}
                />
                <DesignInput
                    label="Tinggi Badan"
                    name="height"
                    placeholder="Dalam satuan cm (sentimeter)"
                    inputMode="numeric"
                    value={displayProfile.height}
                    onChange={handleChange}
                />
                <DesignInput
                    label="Umur"
                    name="age"
                    placeholder="Masukkan umur anda"
                    inputMode="numeric"
                    value={displayProfile.age}
                    onChange={handleChange}
                />

                <label className="flex flex-col items-start font-poppins text-base font-normal leading-[120%] text-[#1e3e8a]">
                    <span className="mb-1">Jenis Kelamin</span>
                    <span className="relative w-full">
                        <button
                            aria-expanded={isGenderOpen}
                            className="flex w-full items-center rounded-[10px] border-[3px] border-[#1e3e8a] bg-[#f3f4f6] py-1.5 pl-[35px] pr-[58px] text-left font-poppins text-lg font-normal leading-[120%] text-[#1e3e8a] shadow-[-4px_3px_0_#1e3e8a] outline-none"
                            type="button"
                            onClick={() =>
                                setIsGenderOpen((current) => !current)
                            }>
                            {selectedGender?.label || "Pilih jenis kelamin"}
                        </button>
                        <span
                            className={`pointer-events-none absolute right-[34px] top-[10px] h-[16px] w-[16px] rotate-45 border-b-[3px] border-r-[3px] border-[#1e3e8a] transition-transform duration-200 ease-out ${
                                isGenderOpen
                                    ? "-translate-y-[1px] rotate-[225deg]"
                                    : ""
                            }`}
                        />
                        <div
                            className={`absolute left-0 right-0 top-[calc(100%+6px)] z-10 overflow-hidden rounded-[8px] border-[3px] border-[#1e3e8a] bg-[#f3f4f6] font-poppins text-lg font-normal leading-[120%] text-[#1e3e8a] shadow-[-3px_3px_0_#1e3e8a] transition-all duration-200 ease-out origin-top ${
                                isGenderOpen
                                    ? "pointer-events-auto translate-y-0 scale-y-100 opacity-100"
                                    : "pointer-events-none -translate-y-2 scale-y-95 opacity-0"
                            }`}>
                            <div>
                                {genderOptions.map((option, index) => (
                                    <button
                                        className={`block w-full px-[35px] py-[9px] text-left transition-colors duration-150 hover:bg-[#60a5fa] hover:text-white ${
                                            index > 0
                                                ? "border-t border-[#1e3e8a]"
                                                : ""
                                        }`}
                                        key={option.value}
                                        type="button"
                                        onClick={() =>
                                            selectGender(option.value)
                                        }>
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </span>
                </label>
            </div>

            <div className="mobile-info-footer flex w-full flex-col items-center gap-[36px]">
                <div className="form-navigation flex w-full max-w-[408px] items-center justify-around gap-2">
                    <DesignButton
                        color="red"
                        icon="/svg4.svg"
                        onClick={handleReset}>
                        Set Ulang
                    </DesignButton>
                    <DesignButton
                        color="green"
                        icon="/svg-path2.svg"
                        onClick={handleNext}>
                        Selanjutnya
                    </DesignButton>
                </div>
                <StepIndicator current={2} total={6} />
            </div>
        </MobileFrame>
    );
};

export default MobileInfo;
