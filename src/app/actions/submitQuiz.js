"use server";

import { createData } from "@/lib/utils";
import { validateProfile } from "@/lib/profileValidation";

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
        const profileValidation = validateProfile(
            {
                name: nama,
                weight: bb,
                height: tb,
                age: umur,
            },
            { requireGender: false },
        );

        if (!profileValidation.isValid) {
            return {
                success: false,
                error: Object.values(profileValidation.errors)[0],
            };
        }

        if (!Number.isFinite(resiko) || resiko < 20 || resiko > 60) {
            return { success: false, error: "Skor risiko tidak valid" };
        }
        if (!status || !["rendah", "tinggi"].includes(status)) {
            return { success: false, error: "Status risiko tidak valid" };
        }
        if (!risk || typeof risk !== "string") {
            return { success: false, error: "Label risiko tidak valid" };
        }

        const { name, weight, height, age } = profileValidation.values;

        const record = await createData(
            name,
            weight,
            height,
            Math.round(resiko),
            status,
            age,
            risk,
        );

        return { success: true, id: record.id };
    } catch (err) {
        console.error("[submitQuizAction] Error:", err);
        return {
            success: false,
            error: "Gagal menyimpan data. Silakan coba lagi.",
        };
    }
}
