"use client";
import { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import DesignButton from "../components/design-button";
import MobileFrame from "../components/mobile-frame";

const MobileLand = () => {
  const router = useRouter();

  const onButtonClick = useCallback(() => {
    router.push("/mobile-info");
  }, [router]);

  return (
    <MobileFrame className="items-center text-center font-poppins text-base leading-[120%]">
      <div className="flex flex-col items-center gap-[26px]">
        <Image
          className="h-[182px] w-[136px]"
          loading="lazy"
          width={136}
          height={182}
          sizes="100vw"
          alt=""
          src="/Logo.svg"
        />
        <div className="flex flex-col items-center gap-6">
          <h1 className="m-0 max-w-[283px] whitespace-pre-line font-display text-5xl font-normal leading-[90%]">
            {"KUIS RISIKO\nHIPERNATREMIA"}
          </h1>
          <p className="m-0 max-w-[283px]">
            Aplikasi web untuk membantu menghitung dan mengevaluasi risiko
            hipernatremia secara cepat, akurat, dan mudah digunakan
          </p>
        </div>
      </div>
      <div className="mt-[86px]">
        <DesignButton icon="/svg-path.svg" onClick={onButtonClick}>
          Ikuti Sekarang
        </DesignButton>
      </div>
      <p className="mt-auto mb-[110px] max-w-[283px]">
        Website ini sebagai instrumen OPSI kelompok Mirza & Anson
      </p>
    </MobileFrame>
  );
};

export default MobileLand;
