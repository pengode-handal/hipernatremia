import Image from "next/image";
import DesignButton from "../../components/design-button";
import MobileFrame from "../../components/mobile-frame";
import ResultPanel from "../../components/result-panel";
import StepIndicator from "../../components/step-indicator";

const MobileFinishRed = () => {
  return (
    <MobileFrame className="mobile-finish-frame items-center justify-between gap-8">
      <header className="mobile-finish-header flex flex-col items-center gap-[5px] text-center text-[#1e3e8a]">
        <Image
          alt=""
          className="h-[115px] w-[87px]"
          height={115}
          src="/Logo4.svg"
          width={87}
        />
        <h1 className="m-0 max-w-full text-center font-display text-[clamp(34px,10.4vw,44px)] font-normal leading-[90%] sm:whitespace-nowrap">
          Hasil Asesmen Diagnostik
        </h1>
      </header>

      <ResultPanel
        advice="Dan Dirikanlah Shalat, Tunaikanlah Zakat Dan Ruku' Lah Beserta Orang-Orang Yang Ruku"
        adviceIcon="/svg-path12.svg"
        category="Risiko Tinggi"
        color="red"
        label="HIPERNATREMIA AKUT"
        logo="/LogoRed1.svg"
        range="200-399 MEQ/L"
      />

      <div className="flex w-full flex-col items-center gap-[48px]">
        <DesignButton icon="/svg12.svg">Simpan Hasil</DesignButton>
        <StepIndicator current={6} total={6} />
      </div>
    </MobileFrame>
  );
};

export default MobileFinishRed;
