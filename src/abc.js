// #################################
// MIDDLEWARE GA DIPAKE, BIKIN RIBET
// #################################

// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";
// import { prisma } from "@/lib/db";

// const protectedRoutes = ["/admin"];
// const publicRoutes = ["/login", "/"];

// export default async function proxy(req) {
//     const path = req.nextUrl.pathname;
//     const isProtectedRoute = protectedRoutes.includes(path);
//     const isPublicRoute = publicRoutes.includes(path);

//     const cookie = (await cookies()).get("session")?.value;
//     async function checkSession(token) {
//         if (!token) return false;

//         const exist = await prisma.session.count({
//             where: {
//                 token,
//                 expiresAt: {
//                     gt: new Date(),
//                 },
//             },
//         });

//         return exist > 0;
//     }

//     const isLoggedIn = await checkSession(cookie);

//     if (isProtectedRoute && !isLoggedIn) {
//         return NextResponse.redirect(new URL("/login", req.nextUrl));
//     }

//     if (
//         isPublicRoute &&
//         isLoggedIn &&
//         !req.nextUrl.pathname.startsWith("/admin")
//     ) {
//         return NextResponse.redirect(new URL("/admin", req.nextUrl));
//     }

//     return NextResponse.next();
// }

// // Routes Proxy should not run on
// export const config = {
//     matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };
