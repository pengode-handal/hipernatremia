import { Suspense } from "react";
import ResultPageClient from "./ResultPageClient";

export const metadata = {
    title: "Hasil Asesmen Diagnostik",
};

export default function MobileResultPage() {
    return (
        <Suspense fallback={null}>
            <ResultPageClient />
        </Suspense>
    );
}
