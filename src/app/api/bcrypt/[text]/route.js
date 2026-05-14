import { hash } from "bcrypt";

export async function GET(request, { params }) {
    const text = (await params).text; // 'a', 'b', etc.
    return Response.json({ hash: await hash(text, 10), text: text });
}
