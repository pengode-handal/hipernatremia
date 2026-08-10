export const PROFILE_LIMITS = Object.freeze({
    name: Object.freeze({ minLength: 2, maxLength: 80 }),
    weight: Object.freeze({ min: 2, max: 300 }),
    height: Object.freeze({ min: 30, max: 250 }),
    age: Object.freeze({ min: 1, max: 120 }),
});

const ALLOWED_GENDERS = new Set(["male", "female"]);
const PERSON_NAME_PATTERN = /^[\p{L}\p{M}.'’ -]+$/u;

function normalizeName(value) {
    return typeof value === "string"
        ? value.trim().replace(/\s+/g, " ")
        : "";
}

function parseWholeNumber(value) {
    if (typeof value === "number") {
        return Number.isInteger(value) ? value : Number.NaN;
    }

    if (typeof value !== "string" || !/^\d+$/.test(value.trim())) {
        return Number.NaN;
    }

    return Number(value);
}

function validateNumber(errors, field, value, label, unit, limits) {
    if (value === "" || value === null || value === undefined) {
        errors[field] = `${label} wajib diisi`;
        return;
    }

    if (!Number.isInteger(value)) {
        errors[field] = `${label} harus berupa angka bulat`;
        return;
    }

    if (value < limits.min || value > limits.max) {
        errors[field] = `${label} harus antara ${limits.min}–${limits.max}${unit}`;
    }
}

export function validateProfile(profile, { requireGender = true } = {}) {
    const errors = {};
    const values = {
        name: normalizeName(profile?.name),
        weight: parseWholeNumber(profile?.weight),
        height: parseWholeNumber(profile?.height),
        age: parseWholeNumber(profile?.age),
        gender:
            typeof profile?.gender === "string" ? profile.gender.trim() : "",
    };

    if (!values.name) {
        errors.name = "Nama wajib diisi";
    } else if (values.name.length < PROFILE_LIMITS.name.minLength) {
        errors.name = `Nama minimal ${PROFILE_LIMITS.name.minLength} karakter`;
    } else if (values.name.length > PROFILE_LIMITS.name.maxLength) {
        errors.name = `Nama maksimal ${PROFILE_LIMITS.name.maxLength} karakter`;
    } else if (!PERSON_NAME_PATTERN.test(values.name)) {
        errors.name =
            "Nama hanya boleh berisi huruf, spasi, titik, apostrof, dan tanda hubung";
    }

    validateNumber(
        errors,
        "weight",
        values.weight,
        "Berat badan",
        " kg",
        PROFILE_LIMITS.weight,
    );
    validateNumber(
        errors,
        "height",
        values.height,
        "Tinggi badan",
        " cm",
        PROFILE_LIMITS.height,
    );
    validateNumber(
        errors,
        "age",
        values.age,
        "Umur",
        " tahun",
        PROFILE_LIMITS.age,
    );

    if (requireGender && !ALLOWED_GENDERS.has(values.gender)) {
        errors.gender = "Jenis kelamin wajib dipilih";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0,
        values,
    };
}
