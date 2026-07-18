"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState, useMemo } from "react";

import DesignButton from "@/components/design-button";
import MobileFrame from "@/components/mobile-frame";
import PageTitle from "@/components/page-title";
import StepIndicator from "@/components/step-indicator";
import SymptomCard from "@/components/symptom-card";

import { getRiskFromScore, useQuizStore } from "@/hooks/useQuizStore";

import { submitQuizAction } from "@/app/actions/submitQuiz";
import { markQuizComplete } from "@/lib/quizValidator";

const INDICATOR_OFFSET = 2;
const INDICATOR_TOTAL = 22;

function RadioStep({
    question,
    answers,
    onSave,
    onNext,
    onSubmit,
    onBack,
    step,
    isLastStep,
    isSubmitting,
}) {
    const [selected, setSelected] = useState(
        () => answers[question.fieldId] ?? null,
    );

    const handleNext = () => {
        if (!selected || isSubmitting) {
            return;
        }

        onSave(question.fieldId, selected);

        if (isLastStep) {
            onSubmit(selected);
            return;
        }

        onNext();
    };

    return (
        <MobileFrame className="mobile-check-frame items-center justify-between gap-8">
            <PageTitle
                icon={
                    <button type="button" onClick={onBack} aria-label="Kembali">
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
                <p className="font-poppins text-base font-medium text-[#1e3e8a]">
                    {question.question}
                </p>

                {question.options.map((option) => (
                    <SymptomCard
                        key={option.id}
                        checked={selected === option.id}
                        title={option.label}
                        description={option.description}
                        onChange={() => setSelected(option.id)}
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
                        {isSubmitting
                            ? "Memproses..."
                            : isLastStep
                              ? "Lihat Hasil"
                              : "Selanjutnya"}
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
    onNext,
    onSubmit,
    onBack,
    step,
    isLastStep,
    isSubmitting,
}) {
    const [checked, setChecked] = useState(() => {
        const savedAnswer = answers[question.fieldId];

        return Array.isArray(savedAnswer) ? savedAnswer : [];
    });

    const toggle = (optionId) => {
        setChecked((currentAnswers) => {
            if (currentAnswers.includes(optionId)) {
                return currentAnswers.filter(
                    (answerId) => answerId !== optionId,
                );
            }

            return [...currentAnswers, optionId];
        });
    };

    const handleNext = () => {
        if (checked.length === 0 || isSubmitting) {
            return;
        }

        onSave(question.fieldId, checked);

        if (isLastStep) {
            onSubmit(checked);
            return;
        }

        onNext();
    };

    return (
        <MobileFrame className="mobile-check-frame items-center justify-between gap-8">
            <PageTitle
                icon={
                    <button type="button" onClick={onBack} aria-label="Kembali">
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
                <p className="font-poppins text-base font-medium text-[#1e3e8a]">
                    {question.question}
                </p>

                {question.options.map((option) => (
                    <SymptomCard
                        key={option.id}
                        checked={checked.includes(option.id)}
                        title={option.label}
                        description={option.description}
                        onChange={() => toggle(option.id)}
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
                        onClick={handleNext}>
                        {isSubmitting
                            ? "Memproses..."
                            : isLastStep
                              ? "Lihat Hasil"
                              : "Selanjutnya"}
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
        if (hydrated) {
            setCurrentStep(question.step);
        }
    }, [hydrated, question.step, setCurrentStep]);

    const questions = useMemo(
        () => (Array.isArray(allQuestions) ? allQuestions : []),
        [allQuestions],
    );

    const lastQuestionStep = questions.reduce(
        (highestStep, currentQuestion) => {
            const currentStep = Number(currentQuestion.step) || 0;

            return Math.max(highestStep, currentStep);
        },
        Number(totalSteps) || 0,
    );

    const isFinalQuestion =
        Boolean(isLastStep) ||
        Number(question.step) === Number(totalSteps) ||
        Number(question.step) === Number(lastQuestionStep);

    const handleBack = useCallback(() => {
        if (Number(question.step) === 1) {
            router.push("/mobile-info");
            return;
        }

        router.push(`/mobile-quiz/${Number(question.step) - 1}`);
    }, [question.step, router]);

    const handleNext = useCallback(() => {
        if (isFinalQuestion) {
            return;
        }

        router.push(`/mobile-quiz/${Number(question.step) + 1}`);
    }, [isFinalQuestion, question.step, router]);

    const handleFinalSubmit = useCallback(
        async (finalValue) => {
            if (isSubmitting) {
                return;
            }

            setIsSubmitting(true);
            setSubmitError(null);

            try {
                const finalAnswers = {
                    ...answers,
                    [question.fieldId]: finalValue,
                };

                let totalScore = 0;

                for (const currentQuestion of questions) {
                    const answer = finalAnswers[currentQuestion.fieldId];

                    if (currentQuestion.type === "radio") {
                        if (!answer) {
                            continue;
                        }

                        const selectedOption = currentQuestion.options?.find(
                            (option) => option.id === answer,
                        );

                        if (selectedOption) {
                            totalScore += Number(selectedOption.score) || 0;
                        }

                        continue;
                    }

                    if (currentQuestion.type === "checkbox") {
                        if (!Array.isArray(answer)) {
                            continue;
                        }

                        for (const selectedId of answer) {
                            const selectedOption =
                                currentQuestion.options?.find(
                                    (option) => option.id === selectedId,
                                );

                            if (selectedOption) {
                                totalScore += Number(selectedOption.score) || 0;
                            }
                        }
                    }
                }

                const riskResult = getRiskFromScore(totalScore);

                const { color, risk, label, status, range, advice } =
                    riskResult;

                const nama = finalAnswers.name ?? finalAnswers.nama ?? "";

                const beratBadan = Number(
                    finalAnswers.weight ??
                        finalAnswers.beratBadan ??
                        finalAnswers.bb ??
                        0,
                );

                const tinggiBadan = Number(
                    finalAnswers.height ??
                        finalAnswers.tinggiBadan ??
                        finalAnswers.tb ??
                        0,
                );

                const umur = Number(finalAnswers.age ?? finalAnswers.umur ?? 0);

                const result = await submitQuizAction({
                    nama,
                    bb: beratBadan,
                    tb: tinggiBadan,
                    umur,
                    resiko: totalScore,
                    status,
                    risk: label,
                });

                if (result?.error) {
                    setSubmitError(result.error);
                    setIsSubmitting(false);
                    return;
                }

                markQuizComplete(totalScore, color, {
                    risk,
                    label,
                    range,
                    advice,
                    status,
                });

                markSubmitted();

                router.push("/mobile-result");
            } catch (error) {
                console.error("Gagal memproses hasil kuis:", error);

                setSubmitError(
                    "Terjadi kesalahan saat memproses hasil. Silakan coba lagi.",
                );

                setIsSubmitting(false);
            }
        },
        [
            answers,
            isSubmitting,
            markSubmitted,
            question.fieldId,
            questions,
            router,
        ],
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
                <p className="text-center font-poppins text-red-500">
                    {submitError}
                </p>

                <DesignButton
                    onClick={() => {
                        setSubmitError(null);
                        setIsSubmitting(false);
                    }}>
                    Coba Lagi
                </DesignButton>
            </MobileFrame>
        );
    }

    const commonProps = {
        question,
        answers,
        step: Number(question.step),
        onBack: handleBack,
        onNext: handleNext,
        onSubmit: handleFinalSubmit,
        isLastStep: isFinalQuestion,
        isSubmitting,
    };

    if (question.type === "radio") {
        return (
            <RadioStep
                key={`${question.step}-${question.fieldId}`}
                {...commonProps}
                onSave={(fieldId, value) => {
                    saveAnswers(fieldId, value, question.step);
                }}
            />
        );
    }

    if (question.type === "checkbox") {
        return (
            <CheckboxStep
                key={`${question.step}-${question.fieldId}`}
                {...commonProps}
                onSave={(fieldId, value) => {
                    saveAnswers(fieldId, value, question.step);
                }}
            />
        );
    }

    return (
        <MobileFrame className="items-center justify-center">
            <p className="text-center font-poppins text-red-500">
                Tipe pertanyaan tidak dikenali.
            </p>
        </MobileFrame>
    );
}
