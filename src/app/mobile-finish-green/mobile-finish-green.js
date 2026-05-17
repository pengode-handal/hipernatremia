import Image from "next/image";
import DesignButton from "../../components/design-button";
import MobileFrame from "../../components/mobile-frame";
import ResultPanel from "../../components/result-panel";
import StepIndicator from "../../components/step-indicator";

const MobileFinishGreen = () => {
  return (
      <MobileFrame className="items-center justify-between gap-8">
        <header className="flex flex-col items-center gap-[5px] text-center text-[#1e3e8a]">
          <Image
            alt=""
            className="h-[115px] w-[87px]"
            height={115}
            src="/Logo4.svg"
            width={87}
          />
          <h1 className="m-0 whitespace-nowrap font-display text-[44px] font-normal leading-[90%]">
            Hasil Asesmen Diagnostik
          </h1>
        </header>
  
        <ResultPanel
          advice="Dan Dirikanlah Shalat, Tunaikanlah Zakat Dan Ruku' Lah Beserta Orang-Orang Yang Ruku"
          adviceIcon="/svg-path12.svg"
          category="Risiko Rendah"
          color="green"
          label="HIPERNATREMIA RENDAH"
          logo="/LogoGreen.svg"
          range="0-100 MEQ/L"
        />
  
        <div className="flex w-full flex-col items-center gap-[48px]">
          <DesignButton icon="/svg12.svg">Simpan Hasil</DesignButton>
          <StepIndicator current={6} total={6} />
        </div>
      </MobileFrame>
    );
  };

export default MobileFinishGreen;
