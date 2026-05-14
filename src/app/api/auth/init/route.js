import { createAdminSession } from "@/lib/auth/session";

export async function GET() {
    const data = await createAdminSession();
    return Response.json({
        data,
    });
}
