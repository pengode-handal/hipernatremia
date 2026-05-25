"use client";

const QUIZ_COMPLETE_KEY = "quiz_completed";
const QUIZ_RESULT_KEY = "quiz_result";

export function markQuizComplete(score, color, riskData) {
    if (typeof window === "undefined") return;

    localStorage.setItem(QUIZ_COMPLETE_KEY, "true");
    localStorage.setItem(
        QUIZ_RESULT_KEY,
        JSON.stringify({
            score,
            color,
            riskData,
            timestamp: Date.now(),
        }),
    );
}

export function isQuizValid() {
    if (typeof window === "undefined") return false;

    const completed = localStorage.getItem(QUIZ_COMPLETE_KEY);
    const resultData = localStorage.getItem(QUIZ_RESULT_KEY);

    if (!completed || !resultData) return false;

    try {
        const data = JSON.parse(resultData);
        const timeSinceCompletion = Date.now() - data.timestamp;

        return timeSinceCompletion <= 30 * 60 * 1000;
    } catch {
        return false;
    }
}

export function getValidQuizResult() {
    if (typeof window === "undefined") return null;

    if (!isQuizValid()) return null;

    try {
        const resultData = localStorage.getItem(QUIZ_RESULT_KEY);
        return JSON.parse(resultData);
    } catch {
        return null;
    }
}
export function clearQuizCompletion() {
    if (typeof window === "undefined") return;

    localStorage.removeItem(QUIZ_COMPLETE_KEY);
    localStorage.removeItem(QUIZ_RESULT_KEY);
}
