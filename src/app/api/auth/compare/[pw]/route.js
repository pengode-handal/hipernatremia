import { compare } from "bcrypt";
import "dotenv/config";

export async function GET(req, { params }) {
    const { pw } = await params;
    const hash = process.env.PW_ADMIN;
    const finale = await compare(pw, hash);
    return Response.json({
        Valid: finale,
    });
}
