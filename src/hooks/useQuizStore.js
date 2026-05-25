// hooks/useQuizStore.js
"use client";

import { useCallback, useState } from "react";

const STORAGE_KEY = "opsi_quiz_state";

const defaultState = {
    currentStep: 1,
    answers: {
        name: "",
        weight: "",
        beratBadan: "",
        age: "",
        umur: "",
        gender: "",
        height: "",
        tinggiBadan: "",
        hidrasi: null,
        renal: null,
        obat: null,
        gejala: [],
    },
    completedSteps: [],
    submittedAt: null,
};

function loadState() {
    if (typeof window === "undefined") return defaultState;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return defaultState;
        const parsed = JSON.parse(raw);
        return {
            ...defaultState,
            ...parsed,
            answers: { ...defaultState.answers, ...parsed.answers },
        };
    } catch {
        return defaultState;
    }
}

function saveState(state) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {}
}

export function useQuizStore() {
    const [state, setStateRaw] = useState(() => loadState());
    const [hydrated] = useState(() => typeof window !== "undefined");

    const setState = useCallback((updater) => {
        setStateRaw((prev) => {
            const next =
                typeof updater === "function" ? updater(prev) : updater;
            saveState(next);
            return next;
        });
    }, []);

    const saveAnswers = useCallback(
        (fieldId, value, step) => {
            setState((prev) => ({
                ...prev,
                answers: { ...prev.answers, [fieldId]: value },
                completedSteps: prev.completedSteps.includes(step)
                    ? prev.completedSteps
                    : [...prev.completedSteps, step],
            }));
        },
        [setState],
    );

    const saveMultipleAnswers = useCallback(
        (fields, step) => {
            setState((prev) => ({
                ...prev,
                answers: { ...prev.answers, ...fields },
                completedSteps: prev.completedSteps.includes(step)
                    ? prev.completedSteps
                    : [...prev.completedSteps, step],
            }));
        },
        [setState],
    );

    const setCurrentStep = useCallback(
        (step) => setState((prev) => ({ ...prev, currentStep: step })),
        [setState],
    );

    const markSubmitted = useCallback(
        () =>
            setState((prev) => ({
                ...prev,
                submittedAt: new Date().toISOString(),
            })),
        [setState],
    );

    const resetQuiz = useCallback(() => {
        if (typeof window !== "undefined") localStorage.removeItem(STORAGE_KEY);
        setState(defaultState);
    }, [setState]);

    const calculateScore = useCallback(
        (questions) => {
            let total = 0;
            for (const q of questions) {
                if (q.type === "radio") {
                    const answer = state.answers[q.fieldId];
                    if (answer) {
                        const opt = q.options.find((o) => o.id === answer);
                        if (opt) total += opt.score;
                    }
                } else if (q.type === "checkbox") {
                    const answer = state.answers[q.fieldId];
                    if (Array.isArray(answer)) {
                        for (const selectedId of answer) {
                            const opt = q.options.find(
                                (o) => o.id === selectedId,
                            );
                            if (opt) total += opt.score;
                        }
                    }
                }
            }
            return total;
        },
        [state.answers],
    );

    return {
        hydrated,
        currentStep: state.currentStep,
        answers: state.answers,
        completedSteps: state.completedSteps,
        submittedAt: state.submittedAt,
        saveAnswers,
        saveMultipleAnswers,
        setCurrentStep,
        markSubmitted,
        resetQuiz,
        calculateScore,
    };
}

export function getRiskFromScore(score) {
    if (score <= 30) {
        return {
            color: "green",
            risk: "Risiko Rendah",
            label: "HIPERNATREMIA MINIMAL",
            range: `${score} MEQ/L`,
            status: "rendah",
            advice: "Risiko hipernatremia saat ini tergolong rendah. Pertahankan asupan cairan yang cukup (≥1500 ml/hari), pantau kondisi pasien secara berkala, dan edukasi pasien mengenai tanda-tanda dehidrasi dini.",
        };
    } else if (score <= 70) {
        return {
            color: "blue",
            risk: "Risiko Sedang",
            label: "HIPERNATREMIA SUBAKUT",
            range: `${score} MEQ/L`,
            status: "sedang",
            advice: "Pasien berisiko sedang mengalami hipernatremia. Tingkatkan pemantauan status cairan, pertimbangkan pemeriksaan elektrolit serum, dan konsultasikan dengan tim medis jika kondisi memburuk dalam 24–48 jam.",
        };
    } else {
        return {
            color: "red",
            risk: "Risiko Tinggi",
            label: "HIPERNATREMIA AKUT",
            range: `${score} MEQ/L`,
            status: "tinggi",
            advice: "Pasien berisiko tinggi mengalami hipernatremia akut. Diperlukan evaluasi segera oleh dokter, pemeriksaan natrium serum, dan tatalaksana koreksi cairan yang tepat untuk mencegah komplikasi neurologis serius.",
        };
    }
}
