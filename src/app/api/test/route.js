import { prisma } from "@/lib/db";

export async function GET() {
    const data = await prisma.opsi.create({
        data: {
            name: "Budi",
            beratBadan: 60,
            risikoMeter: 3,
            status: "Normal",
            umur: 18,
            tinggiBadan: 170,
        },
    });

    return Response.json(data);
}
