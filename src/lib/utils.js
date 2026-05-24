"server-only";

import { prisma } from "./db";

const ALLOWED_FIELDS = new Set([
    "name",
    "beratBadan",
    "umur",
    "status",
    "tinggiBadan",
    "risikoMeter",
]);

export const getAllItems = () => prisma.opsi.findMany();

export const createData = (nama, bb, tb, resiko, status, umur, risk) => {
    if (!nama || !bb || !tb || !resiko || !status || !umur || !risk)
        throw new Error("Data tidak lengkap");

    return prisma.opsi.create({
        data: {
            name: nama,
            beratBadan: bb,
            tinggiBadan: tb,
            risikoMeter: resiko,
            status,
            umur,
            risk,
        },
    });
};

export const customFilter = (key, value) => {
    if (!key || !value) throw new Error("Data tidak lengkap");
    if (!ALLOWED_FIELDS.has(key)) throw new Error("Field tidak valid");

    return prisma.opsi.findMany({
        where: { [key]: { contains: value, mode: "insensitive" } },
    });
};
