"use server";

import { cookies } from "next/headers";
import { verifyGuest } from "./dal";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "ansonmirza";
const ADMIN_SESSION_TOKEN =
    process.env.ADMIN_SESSION_TOKEN || "local-admin-session";

export const adminLogin = async (password) => {
    if (await verifyGuest()) {
        return { success: false, message: "Anda sudah login" };
    }
    if (password !== ADMIN_PASSWORD) {
        return { success: false, message: "Sandi tidak sesuai" };
    }

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();

    cookieStore.set("session", ADMIN_SESSION_TOKEN, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    });

    return {
        success: true,
    };
};
