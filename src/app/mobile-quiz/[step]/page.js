import { notFound, redirect } from "next/navigation";
import questions from "@/app/questions.json";
import QuizStepClient from "./QuizStepClient";

export function generateStaticParams() {
    return questions.map((q) => ({ step: String(q.step) }));
}

export async function generateMetadata({ params }) {
    const { step } = await params;
    const q = questions.find((q) => q.step === Number(step));
    if (!q) return {};
    return { title: q.pageTitle };
}

export default async function QuizStepPage({ params }) {
    const { step } = await params;
    const stepNum = Number(step);

    if (isNaN(stepNum) || stepNum < 1 || stepNum > questions.length) {
        notFound();
    }

    const question = questions.find((q) => q.step === stepNum);
    const totalSteps = questions.length;
    const isLastStep = stepNum === totalSteps;

    return (
        <QuizStepClient
            suppressHydrationWarning
            question={question}
            totalSteps={totalSteps}
            isLastStep={isLastStep}
            allQuestions={questions}
        />
    );
}
