import { prisma } from "@/lib/db";

export async function GET(request, { params }) {
    const riskLevels = ["low", "medium", "high"];

    const risk = riskLevels[Math.floor(Math.random() * riskLevels.length)];
    const { name } = await params;
    const data = await prisma.opsi.create({
        data: {
            name: name,
            beratBadan: 60,
            risikoMeter: 3,
            status: "Normal",
            umur: 18,
            tinggiBadan: 170,
            risk: risk,
        },
    });

    return Response.json(data);
}
