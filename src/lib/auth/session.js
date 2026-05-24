"use server";

import { cookies } from "next/headers";
import { prisma } from "@/lib/db";
import { randomUUID } from "crypto";
import { verifyGuest } from "./dal";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";

export const adminLogin = async (password) => {
    if (await verifyGuest()) {
        return { success: false, message: "Anda sudah login" };
    }
    if (password !== ADMIN_PASSWORD) {
        return { success: false, message: "Sandi tidak sesuai" };
    }

    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await prisma.session.create({
        data: {
            token,
            expiresAt,
        },
    });

    const cookieStore = await cookies();

    cookieStore.set("session", token, {
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
