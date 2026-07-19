import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/db";

const ADMIN_SESSION_TOKEN =
    process.env.ADMIN_SESSION_TOKEN || "local-admin-session";

export const verifySession = cache(async () => {
    const token = (await cookies()).get("session")?.value;
    if (!token) redirect("/");

    if (token === ADMIN_SESSION_TOKEN) return;

    let session = null;

    try {
        session = await prisma.session.findFirst({
            where: { token, expiresAt: { gt: new Date() } },
            select: { id: true },
        });
    } catch (error) {
        console.warn("Gagal memverifikasi session dari database:", error);
    }

    if (!session) redirect("/");
});

export const verifyGuest = async () => {
    const token = (await cookies()).get("session")?.value;
    if (!token) return false;

    if (token === ADMIN_SESSION_TOKEN) return true;

    let session = null;

    try {
        session = await prisma.session.findFirst({
            where: { token, expiresAt: { gt: new Date() } },
            select: { id: true },
        });
    } catch (error) {
        console.warn("Gagal memverifikasi guest dari database:", error);
    }

    return Boolean(session);
};
