import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "@/lib/db";

// cache() → kalau verifySession dipanggil 2x dalam 1 render, DB hanya diquery 1x
export const verifySession = cache(async () => {
    const token = (await cookies()).get("session")?.value;
    if (!token) redirect("/login");

    const session = await prisma.session.findFirst({
        where: { token, expiresAt: { gt: new Date() } },
        select: { id: true },
    });

    if (!session) redirect("/login");
});

export const verifyGuest = cache(async () => {
    const token = (await cookies()).get("session")?.value;
    if (!token) return;

    const session = await prisma.session.findFirst({
        where: { token, expiresAt: { gt: new Date() } },
        select: { id: true },
    });

    if (session) redirect("/admin");
});
