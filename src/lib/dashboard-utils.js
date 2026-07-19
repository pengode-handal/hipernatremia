export function isInRange(value, selectedRange) {
    if (!selectedRange || selectedRange.startsWith("Semua")) {
        return true;
    }

    const numericValue = Number(value || 0);

    if (selectedRange.includes("+")) {
        const min = Number(selectedRange.match(/\d+/)?.[0] || 0);
        return numericValue >= min;
    }

    const [min, max] = selectedRange.match(/\d+/g)?.map(Number) || [];

    return numericValue >= min && numericValue <= max;
}

export function scoreValue(score) {
    if (score == null) return 0;

    if (typeof score === "number") {
        return score;
    }

    return Number(score.match(/\d+/)?.[0] || 0);
}

export function normalizeRiskStatus(status) {
    const normalizedStatus = String(status || "").toLowerCase();

    if (
        normalizedStatus === "rendah" ||
        normalizedStatus.includes("tidak") ||
        normalizedStatus.includes("rendah")
    ) {
        return "rendah";
    }

    if (
        normalizedStatus === "tinggi" ||
        normalizedStatus === "sedang" ||
        normalizedStatus.includes("berisiko") ||
        normalizedStatus.includes("sedang") ||
        normalizedStatus.includes("tinggi")
    ) {
        return "tinggi";
    }

    return status;
}

export function filterRespondents(respondents, filterValues, searchQuery = "") {
    const normalizedSearch = searchQuery.trim().toLowerCase();
    const selectedStatus =
        filterValues.status === "Tidak Berisiko"
            ? "rendah"
            : filterValues.status === "Berisiko"
              ? "tinggi"
              : filterValues.status;

    return respondents.filter((respondent) => {
        return (
            (!normalizedSearch ||
                respondent.name.toLowerCase().includes(normalizedSearch)) &&
            (!selectedStatus ||
                selectedStatus === "Semua Status" ||
                normalizeRiskStatus(respondent.status) === selectedStatus) &&
            isInRange(respondent.umur, filterValues.age) &&
            isInRange(respondent.beratBadan, filterValues.weight) &&
            isInRange(respondent.tinggiBadan, filterValues.height) &&
            isInRange(scoreValue(respondent.risikoMeter), filterValues.risk)
        );
    });
}

export function getPaginationItems(currentPage, totalPages) {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set([
        1,
        totalPages,
        currentPage - 1,
        currentPage,
        currentPage + 1,
    ]);

    if (currentPage <= 3) {
        pages.add(2);
        pages.add(3);
        pages.add(4);
    }

    if (currentPage >= totalPages - 2) {
        pages.add(totalPages - 3);
        pages.add(totalPages - 2);
        pages.add(totalPages - 1);
    }

    const sortedPages = [...pages]
        .filter((page) => page >= 1 && page <= totalPages)
        .sort((a, b) => a - b);

    return sortedPages.flatMap((page, index) => {
        const previousPage = sortedPages[index - 1];

        if (index > 0 && page - previousPage > 1) {
            return [`ellipsis-${previousPage}-${page}`, page];
        }

        return [page];
    });
}
