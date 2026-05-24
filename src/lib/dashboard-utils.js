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

export function meterValue(meter) {
    if (meter == null) return 0;

    if (typeof meter === "number") {
        return meter;
    }

    return Number(meter.match(/\d+/)?.[0] || 0);
}

export function filterRespondents(respondents, filterValues, searchQuery = "") {
    const normalizedSearch = searchQuery.trim().toLowerCase();

    return respondents.filter((respondent) => {
        return (
            (!normalizedSearch ||
                respondent.name.toLowerCase().includes(normalizedSearch)) &&
            (!filterValues.status ||
                filterValues.status === "Semua Status" ||
                respondent.status === filterValues.status) &&
            isInRange(respondent.umur, filterValues.age) &&
            isInRange(respondent.beratBadan, filterValues.weight) &&
            isInRange(respondent.tinggiBadan, filterValues.height) &&
            isInRange(meterValue(respondent.risikoMeter), filterValues.risk)
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
