"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import DesignButton from "../../components/design-button";
import MobileFrame from "../../components/mobile-frame";
import PageTitle from "../../components/page-title";
import StepIndicator from "../../components/step-indicator";
import SymptomCard from "../../components/symptom-card";

const symptoms = [
  {
    id: "symptom-1",
    title: "Nama Gejala",
    description:
      "Difitnah saya diam. Dihina saya diam. Kali ini di Jogja saya akan lawan.",
  },
  {
    id: "symptom-2",
    title: "Nama Gejala",
    description:
      "Difitnah saya diam. Dihina saya diam. Kali ini di Jogja saya akan lawan.",
  },
  {
    id: "symptom-3",
    title: "Nama Gejala",
    description: "Difitnah saya diam. Dihina saya diam. Kali ini di Jogja saya akan lawan.",
  },
];

const MobileCheckPressed = () => {
  const router = useRouter();
  const [checkedSymptoms, setCheckedSymptoms] = useState([]);

  function toggleSymptom(id) {
    setCheckedSymptoms((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <MobileFrame className="items-center justify-between gap-8">
      <PageTitle
        icon={
          <button onClick={() => router.push("/mobile-info")}>
            <Image alt="" className="h-[46px] w-[46px]" height={46} src="/svg1.svg" width={46} />
          </button>
        }
      >
        Gejala yang Dialami
      </PageTitle>

      <section className="flex w-full flex-col gap-5">
        {symptoms.map((symptom) => (
          <SymptomCard
            checked={checkedSymptoms.includes(symptom.id)}
            description={symptom.description}
            key={symptom.id}
            title={symptom.title}
            onChange={() => toggleSymptom(symptom.id)}
          />
        ))}
      </section>

      <div className="flex w-full flex-col items-center gap-[36px]">
        <div className="flex w-full max-w-[408px] items-center justify-around gap-2">
          <DesignButton color="red" icon="/svg2.svg" onClick={() => setCheckedSymptoms([])}>
            Set Ulang
          </DesignButton>
          <DesignButton
            color="green"
            icon="/svg-path1.svg"
            onClick={() => router.push("/mobile-finish-red")}
          >
            Lihat Hasil
          </DesignButton>
        </div>

        <StepIndicator current={5} total={6} />
      </div>
    </MobileFrame>
  );
};

export default MobileCheckPressed;
