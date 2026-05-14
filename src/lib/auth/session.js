import { compare } from "bcrypt";
import "dotenv/config";
import { prisma } from "../db";
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

export const createAdminSession = async () => {
    const token = randomUUID();

    const setCookie = await cookies();
    const expireAt = new Date();
    expireAt.setDate(expireAt.getDate() + 7);

    const data = await prisma.session.create({
        data: {
            token,
            expiresAt: expireAt,
        },
    });

    setCookie.set("session", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        expires: expireAt,
        path: "/",
    });

    return data;
};

export async function loginValidate(pw) {
    const hash = process.env.PW_ADMIN;
    const finale = await compare(pw, hash);
    return finale;
}
