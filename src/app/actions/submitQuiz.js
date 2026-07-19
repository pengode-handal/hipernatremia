"use server";

import { createData } from "@/lib/utils";

/**
 * @param {{ nama, bb, tb, resiko, status, umur, risk }} payload
 * @returns {{ success: boolean, id?: string, error?: string }}
 */
export async function submitQuizAction({
    nama,
    bb,
    tb,
    resiko,
    status,
    umur,
    risk,
}) {
    try {
        if (!nama || typeof nama !== "string" || nama.trim().length === 0) {
            return { error: "Nama tidak valid" };
        }
        if (!Number.isFinite(bb) || bb <= 0 || bb > 300) {
            return { error: "Berat badan tidak valid" };
        }
        if (!Number.isFinite(tb) || tb <= 0 || tb > 250) {
            return { error: "Tinggi badan tidak valid" };
        }
        if (!Number.isFinite(umur) || umur < 0 || umur > 120) {
            return { error: "Usia tidak valid" };
        }
        if (!Number.isFinite(resiko) || resiko < 20 || resiko > 60) {
            return { error: "Skor risiko tidak valid" };
        }
        if (!status || !["rendah", "tinggi"].includes(status)) {
            return { error: "Status risiko tidak valid" };
        }
        if (!risk || typeof risk !== "string") {
            return { error: "Label risiko tidak valid" };
        }

        const record = await createData(
            nama.trim(),
            Math.round(bb),
            Math.round(tb),
            Math.round(resiko),
            status,
            Math.round(umur),
            risk,
        );

        return { success: true, id: record.id };
    } catch (err) {
        console.error("[submitQuizAction] Error:", err);
        return { error: "Gagal menyimpan data. Silakan coba lagi." };
    }
}
