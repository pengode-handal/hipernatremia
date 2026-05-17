import { NextResponse } from "next/server";

const protectedRoutes = ["/admin"];
const guestRoutes = ["/login"];

export function proxy(req) {
    const token = req.cookies.get("session")?.value;
    const path = req.nextUrl.pathname;

    const isProtected = protectedRoutes.some((r) => path.startsWith(r));
    const isGuest = guestRoutes.some((r) => path.startsWith(r));

    if (isProtected && !token)
        return NextResponse.redirect(new URL("/login", req.url));

    if (isGuest && token)
        return NextResponse.redirect(new URL("/admin", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
