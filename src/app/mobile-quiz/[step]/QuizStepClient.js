"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import DesignButton from "@/components/design-button";
import MobileFrame from "@/components/mobile-frame";
import PageTitle from "@/components/page-title";
import StepIndicator from "@/components/step-indicator";
import SymptomCard from "@/components/symptom-card";
import { useQuizStore, getRiskFromScore } from "@/hooks/useQuizStore";
import { submitQuizAction } from "@/app/actions/submitQuiz";
import { markQuizComplete } from "@/lib/quizValidator";

const INDICATOR_OFFSET = 2;
const INDICATOR_TOTAL = 6;

function RadioStep({ question, answers, onSave, onNext, onBack, step }) {
    const [selected, setSelected] = useState(
        () => answers[question.fieldId] ?? null,
    );

    const handleNext = () => {
        if (!selected) return;
        onSave(question.fieldId, selected);
        onNext();
    };

    return (
        <MobileFrame className="mobile-check-frame items-center justify-between gap-8">
            <PageTitle
                icon={
                    <button onClick={onBack} type="button">
                        <Image
                            alt="Kembali"
                            className="h-[46px] w-[46px]"
                            height={46}
                            src="/svg1.svg"
                            width={46}
                        />
                    </button>
                }>
                {question.pageTitle}
            </PageTitle>

            <section className="mobile-check-list flex w-full flex-col gap-5">
                <p className="font-poppins text-base text-[#1e3e8a] font-medium">
                    {question.question}
                </p>
                {question.options.map((opt) => (
                    <SymptomCard
                        key={opt.id}
                        checked={selected === opt.id}
                        title={opt.label}
                        description={opt.description}
                        onChange={() => setSelected(opt.id)}
                    />
                ))}
            </section>

            <div className="flex w-full flex-col items-center gap-[36px]">
                <div className="form-navigation flex w-full max-w-[408px] items-center justify-around gap-2">
                    <DesignButton
                        color="red"
                        icon="/svg2.svg"
                        onClick={() => setSelected(null)}>
                        Set Ulang
                    </DesignButton>
                    <DesignButton
                        color="green"
                        icon="/svg-path1.svg"
                        onClick={handleNext}>
                        Selanjutnya
                    </DesignButton>
                </div>
                <StepIndicator
                    current={step + INDICATOR_OFFSET}
                    total={INDICATOR_TOTAL}
                />
            </div>
        </MobileFrame>
    );
}

function CheckboxStep({
    question,
    answers,
    onSave,
    onSubmit,
    onBack,
    step,
    isSubmitting,
}) {
    const [checked, setChecked] = useState(
        () => answers[question.fieldId] ?? [],
    );

    const toggle = (id) =>
        setChecked((curr) =>
            curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id],
        );

    const handleSubmit = () => {
        onSave(question.fieldId, checked);
        onSubmit(checked);
    };

    return (
        <MobileFrame className="mobile-check-frame items-center justify-between gap-8">
            <PageTitle
                icon={
                    <button onClick={onBack} type="button">
                        <Image
                            alt="Kembali"
                            className="h-[46px] w-[46px]"
                            height={46}
                            src="/svg1.svg"
                            width={46}
                        />
                    </button>
                }>
                {question.pageTitle}
            </PageTitle>

            <section className="mobile-check-list flex w-full flex-col gap-5">
                <p className="font-poppins text-base text-[#1e3e8a] font-medium">
                    {question.question}
                </p>
                {question.options.map((opt) => (
                    <SymptomCard
                        key={opt.id}
                        checked={checked.includes(opt.id)}
                        title={opt.label}
                        description={opt.description}
                        onChange={() => toggle(opt.id)}
                    />
                ))}
            </section>

            <div className="flex w-full flex-col items-center gap-[36px]">
                <div className="form-navigation flex w-full max-w-[408px] items-center justify-around gap-2">
                    <DesignButton
                        color="red"
                        icon="/svg2.svg"
                        onClick={() => setChecked([])}>
                        Set Ulang
                    </DesignButton>
                    <DesignButton
                        color="green"
                        icon="/svg-path1.svg"
                        onClick={handleSubmit}>
                        {isSubmitting ? "Memproses..." : "Lihat Hasil"}
                    </DesignButton>
                </div>
                <StepIndicator
                    current={step + INDICATOR_OFFSET}
                    total={INDICATOR_TOTAL}
                />
            </div>
        </MobileFrame>
    );
}

export default function QuizStepClient({
    question,
    totalSteps,
    isLastStep,
    allQuestions,
}) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);

    const { hydrated, answers, saveAnswers, setCurrentStep, markSubmitted } =
        useQuizStore();

    useEffect(() => {
        if (hydrated) setCurrentStep(question.step);
    }, [hydrated, question.step, setCurrentStep]);

    const handleBack = useCallback(() => {
        if (question.step === 1) {
            router.push("/mobile-info");
        } else {
            router.push(`/mobile-quiz/${question.step - 1}`);
        }
    }, [question.step, router]);

    const handleNext = useCallback(() => {
        router.push(`/mobile-quiz/${question.step + 1}`);
    }, [question.step, router]);

    const handleFinalSubmit = useCallback(
        async (checkboxValue) => {
            setIsSubmitting(true);
            setSubmitError(null);

            try {
                const finalAnswers = {
                    ...answers,
                    [question.fieldId]: checkboxValue,
                };

                let total = 0;
                for (const q of allQuestions) {
                    if (q.type === "radio") {
                        const answer = finalAnswers[q.fieldId];
                        if (answer) {
                            const opt = q.options?.find((o) => o.id === answer);
                            if (opt) total += opt.score;
                        }
                    } else if (q.type === "checkbox") {
                        const answer = finalAnswers[q.fieldId];
                        if (Array.isArray(answer)) {
                            for (const selectedId of answer) {
                                const opt = q.options?.find(
                                    (o) => o.id === selectedId,
                                );
                                if (opt) total += opt.score;
                            }
                        }
                    }
                }

                const { color, risk, label, status, range, advice } =
                    getRiskFromScore(total);

                const nama = finalAnswers.name ?? "";
                const bb = Number(
                    finalAnswers.weight || finalAnswers.beratBadan || 0,
                );
                const tb = Number(
                    finalAnswers.height || finalAnswers.tinggiBadan || 0,
                );
                const umur = Number(finalAnswers.age || finalAnswers.umur || 0);

                const result = await submitQuizAction({
                    nama,
                    bb,
                    tb,
                    resiko: total,
                    status,
                    umur,
                    risk: label,
                });

                if (result?.error) {
                    setSubmitError(result.error);
                    setIsSubmitting(false);
                    return;
                }

                markQuizComplete(total, color, {
                    risk,
                    label,
                    range,
                    advice,
                    status,
                });

                markSubmitted();

                router.push(`/mobile-result`);
            } catch (err) {
                console.error(err);
                setSubmitError("Terjadi kesalahan. Silakan coba lagi.");
                setIsSubmitting(false);
            }
        },
        [answers, allQuestions, question, markSubmitted, router],
    );

    if (!hydrated) {
        return (
            <MobileFrame className="items-center justify-center">
                <p className="font-poppins text-[#1e3e8a]">Memuat...</p>
            </MobileFrame>
        );
    }

    if (submitError) {
        return (
            <MobileFrame className="items-center justify-center gap-4">
                <p className="font-poppins text-red-500 text-center">
                    {submitError}
                </p>
                <DesignButton onClick={() => setSubmitError(null)}>
                    Coba Lagi
                </DesignButton>
            </MobileFrame>
        );
    }

    const commonProps = {
        question,
        answers,
        step: question.step,
        onBack: handleBack,
    };

    if (question.type === "radio") {
        return (
            <RadioStep
                {...commonProps}
                onSave={(fieldId, value) =>
                    saveAnswers(fieldId, value, question.step)
                }
                onNext={handleNext}
            />
        );
    }

    if (question.type === "checkbox") {
        return (
            <CheckboxStep
                {...commonProps}
                onSave={(fieldId, value) =>
                    saveAnswers(fieldId, value, question.step)
                }
                onSubmit={handleFinalSubmit}
                isSubmitting={isSubmitting}
            />
        );
    }

    return null;
}
