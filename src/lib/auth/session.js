import { compare } from "bcrypt";
import { prisma } from "../db";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export const createAdminSession = async () => {
    const token = randomUUID();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const [data, cookieStore] = await Promise.all([
        prisma.session.create({ data: { token, expiresAt } }),
        cookies(),
    ]);

    cookieStore.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expiresAt,
        path: "/",
    });

    return data;
};

export const loginValidate = (pw) => compare(pw, process.env.PW_ADMIN);
