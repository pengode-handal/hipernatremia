import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { prisma } from "../db";

export const sessionValidate = async () => {
    const token = (await cookies()).get("session")?.value;

    if (!token) {
        redirect("/login");
    }

    const isLoggedIn = await prisma.session.findFirst({
        where: {
            token,
            expiresAt: {
                gt: new Date(),
            },
        },
    });
    console.log(!isLoggedIn);
    return !isLoggedIn;
};

export const sessionRedirect = async (condition, dest) => {
    if (await condition) {
        redirect(dest);
    }
    // console.log("sekarang:" + await condition);
};
