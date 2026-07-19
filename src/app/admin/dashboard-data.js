export const filters = [
    {
        key: "status",
        label: "Status",
        options: ["Semua Status", "Tidak Berisiko", "Berisiko"],
    },
    {
        key: "age",
        label: "Umur",
        options: [
            "Semua Umur",
            "0-12 tahun",
            "13-18 tahun",
            "19-59 tahun",
            "60+ tahun",
        ],
    },
    {
        key: "weight",
        label: "Berat Badan",
        options: ["Semua BB", "0-40 kg", "41-60 kg", "61-80 kg", "81+ kg"],
    },
    {
        key: "height",
        label: "Tinggi Badan",
        options: [
            "Semua TB",
            "0-140 cm",
            "141-160 cm",
            "161-180 cm",
            "181+ cm",
        ],
    },
    {
        key: "risk",
        label: "Skor",
        options: ["Semua Skor", "20-39 poin", "40-60 poin"],
    },
];

const patientSeed = [
    {
        name: "Mirza Opsi Uhuy",
        status: "tinggi",
        umur: 21,
        beratBadan: 67,
        tinggiBadan: 170,
        risikoMeter: 48,
        risk: "BERISIKO MENGALAMI HIPERNATREMIA",
    },
    {
        name: "Anson Opsi Anjay",
        status: "rendah",
        umur: 20,
        beratBadan: 62,
        tinggiBadan: 168,
        risikoMeter: 28,
        risk: "TIDAK BERISIKO MENGALAMI HIPERNATREMIA",
    },
    {
        name: "Saip Subianto Rakabuming",
        status: "tinggi",
        umur: 34,
        beratBadan: 74,
        tinggiBadan: 172,
        risikoMeter: 42,
        risk: "BERISIKO MENGALAMI HIPERNATREMIA",
    },
    {
        name: "Dewi Airin Putri",
        status: "rendah",
        umur: 17,
        beratBadan: 51,
        tinggiBadan: 158,
        risikoMeter: 33,
        risk: "TIDAK BERISIKO MENGALAMI HIPERNATREMIA",
    },
    {
        name: "Bima Hidrasi Pratama",
        status: "tinggi",
        umur: 61,
        beratBadan: 80,
        tinggiBadan: 176,
        risikoMeter: 55,
        risk: "BERISIKO MENGALAMI HIPERNATREMIA",
    },
    {
        name: "Nadia Sehat Lestari",
        status: "rendah",
        umur: 29,
        beratBadan: 58,
        tinggiBadan: 162,
        risikoMeter: 22,
        risk: "TIDAK BERISIKO MENGALAMI HIPERNATREMIA",
    },
];

export const patients = Array.from(
    { length: 100 },
    (_, index) => patientSeed[index % patientSeed.length],
);
