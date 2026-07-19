"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DesignButton from "@/components/design-button";
import MobileFrame from "@/components/mobile-frame";
import ResultPanel from "@/components/result-panel";
import { getValidQuizResult, clearQuizCompletion } from "@/lib/quizValidator";

const logoMap = {
    green: "/LogoGreen.svg",
    blue: "/LogoBlue.svg",
    red: "/LogoRed1.svg",
};

const adviceIconMap = {
    green: "/svg-path12.svg",
    blue: "/svg-path12.svg",
    red: "/svg-path12.svg",
};

export default function ResultPageClient() {
    const router = useRouter();
    const [resultData, setResultData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const validResult = getValidQuizResult();

        if (!validResult) {
            router.replace("/");
            return;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setResultData(validResult);
        setLoading(false);
    }, [router]);

    const handleSave = useCallback(() => {
        if (!resultData) return;

        if (typeof window !== "undefined" && navigator.share) {
            navigator
                .share({
                    title: "Hasil Asesmen Hipernatremia",
                    text: `${resultData.riskData.risk} — ${resultData.riskData.label} (${resultData.riskData.range})`,
                    url: window.location.href,
                })
                .catch(() => {});
        } else if (typeof window !== "undefined") {
            window.print();
        }
    }, [resultData]);

    const handleReset = useCallback(() => {
        clearQuizCompletion();
        localStorage.removeItem("opsi_quiz_state");
        router.push("/");
    }, [router]);

    if (loading) {
        return (
            <MobileFrame className="mobile-finish-frame items-center justify-center">
                <div className="text-center font-poppins text-[#1e3e8a]">
                    Memuat hasil...
                </div>
            </MobileFrame>
        );
    }

    if (!resultData) {
        return null;
    }

    const { color, riskData } = resultData;
    const { risk, label, range, advice } = riskData;

    return (
        <MobileFrame className="mobile-finish-frame items-center justify-between gap-8">
            <header className="mobile-finish-header flex flex-col items-center gap-[5px] text-center text-[#1e3e8a]">
                <Image
                    alt=""
                    className="h-[115px] w-[87px]"
                    height={115}
                    src={logoMap[color] ?? logoMap.green}
                    width={87}
                />
                <h1 className="m-0 max-w-full text-center font-display text-[clamp(34px,10.4vw,44px)] font-normal leading-[90%] sm:whitespace-nowrap">
                    Hasil Asesmen Diagnostik
                </h1>
            </header>

            <ResultPanel
                advice={advice}
                adviceIcon={adviceIconMap[color]}
                category={risk}
                color={color}
                label={label}
                logo={logoMap[color] ?? logoMap.green}
                range={range}
            />

            <div className="form-navigation flex w-full max-w-[408px] items-center justify-around gap-2">
                <DesignButton
                    color="red"
                    icon="/svg2.svg"
                    onClick={handleReset}>
                    Kuis Baru
                </DesignButton>
                <DesignButton icon="/svg12.svg" onClick={handleSave}>
                    Simpan Hasil
                </DesignButton>
            </div>
        </MobileFrame>
    );
}
