import { prisma } from "./db";

const getAllItems = async () => {
    return await prisma.opsi.findMany();
};

const createData = async (nama, bb, tb, resiko, status, umur) => {
    if (!nama || !bb || !tb || resiko || !status || !umur)
        return Response.json({ error: "Data tidak lengkap" }, { status: 400 });
    const data = await prisma.opsi.create({
        data: {
            name: nama,
            beratBadan: bb,
            risikoMeter: resiko,
            status: status,
            umur: umur,
            tinggiBadan: tb,
        },
    });
    return Response.json({ message: "Berhasil", data: data });
};

const allowedFields = [
    "name",
    "beratBadan",
    "umur",
    "status",
    "tinggiBadan",
    "risikoMeter",
];

export const customFilter = async (key, value) => {
    if (!key || !value) {
        return Response.json({ error: "Data tidak lengkap" }, { status: 400 });
    }

    if (!allowedFields.includes(key)) {
        return Response.json({ error: "Field tidak valid" }, { status: 400 });
    }

    const data = await prisma.opsi.findMany({
        where: {
            [key]: {
                contains: value,
                mode: "insensitive",
            },
        },
    });

    return data;
};
