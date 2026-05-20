"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AdminLoginPopup from "../components/admin-login-popup";
import DesignButton from "../components/design-button";
import MobileFrame from "../components/mobile-frame";

const MobileLand = () => {
  const router = useRouter();
  const [logoTapCount, setLogoTapCount] = useState(0);
  const [logoStage, setLogoStage] = useState("idle");
  const [logoAnimationKey, setLogoAnimationKey] = useState(0);
  const [isAdminLogoRed, setIsAdminLogoRed] = useState(false);
  const [isAdminPopupOpen, setIsAdminPopupOpen] = useState(false);
  const returnTimerRef = useRef(null);
  const redSwapTimerRef = useRef(null);
  const popupOpenTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(returnTimerRef.current);
      clearTimeout(redSwapTimerRef.current);
      clearTimeout(popupOpenTimerRef.current);
    };
  }, []);

  const onButtonClick = useCallback(() => {
    router.push("/mobile-info");
  }, [router]);

  const onLogoClick = useCallback(() => {
    if (
      logoStage === "unlocking" ||
      logoStage === "red" ||
      logoStage === "returning" ||
      isAdminPopupOpen
    ) {
      return;
    }

    clearTimeout(returnTimerRef.current);
    clearTimeout(redSwapTimerRef.current);
    clearTimeout(popupOpenTimerRef.current);

    setLogoTapCount((currentCount) => {
      const nextCount = currentCount + 1;
      setLogoAnimationKey((currentKey) => currentKey + 1);

      if (nextCount >= 5) {
        setLogoStage("unlocking");
        redSwapTimerRef.current = window.setTimeout(() => {
          setIsAdminLogoRed(true);
        }, 1200);
        popupOpenTimerRef.current = window.setTimeout(() => {
          setLogoStage("red");
          setIsAdminPopupOpen(true);
        }, 2400);
        return 0;
      }

      setLogoStage("shake");

      return nextCount;
    });
  }, [isAdminPopupOpen, logoStage]);

  const onAdminPopupClose = useCallback(() => {
    setIsAdminPopupOpen(false);
    setLogoTapCount(0);
    setLogoAnimationKey((currentKey) => currentKey + 1);
    setLogoStage("returning");
    clearTimeout(redSwapTimerRef.current);
    clearTimeout(returnTimerRef.current);
    redSwapTimerRef.current = window.setTimeout(() => {
      setIsAdminLogoRed(false);
    }, 1200);
    returnTimerRef.current = window.setTimeout(() => {
      setLogoStage("idle");
    }, 2400);
  }, []);

  return (
    <>
      <MobileFrame className="mobile-land-frame items-center text-center font-poppins text-base leading-[120%]">
        <div className="flex flex-col items-center gap-[26px]">
          <button
            type="button"
            aria-label="Logo kuis"
            className="admin-logo-trigger h-[182px] w-[136px] bg-transparent p-0"
            onClick={onLogoClick}
          >
            <span
              key={logoAnimationKey}
              className={`admin-logo-stage admin-logo-stage--${logoStage}`}
            >
              <Image
                className={`admin-logo-layer ${
                  isAdminLogoRed ? "admin-logo-layer--hidden" : ""
                }`}
                loading="lazy"
                width={136}
                height={182}
                sizes="100vw"
                alt=""
                src="/Logo.svg"
              />
              <Image
                className={`admin-logo-layer ${
                  isAdminLogoRed ? "" : "admin-logo-layer--hidden"
                }`}
                loading="lazy"
                width={136}
                height={182}
                sizes="100vw"
                alt=""
                src="/LogoGuard@2x.png"
              />
            </span>
          </button>
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
        <div className="mobile-land-action mt-[86px]">
          <DesignButton icon="/svg-path.svg" onClick={onButtonClick}>
            Ikuti Sekarang
          </DesignButton>
        </div>
        <p className="mobile-land-footer mt-auto mb-[110px] max-w-[283px]">
          Website ini sebagai instrumen OPSI kelompok Mirza & Anson
        </p>
      </MobileFrame>
      <AdminLoginPopup
        open={isAdminPopupOpen}
        onClose={onAdminPopupClose}
      />
    </>
  );
};

export default MobileLand;
