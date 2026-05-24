export function isInRange(value, selectedRange) {
  if (!selectedRange || selectedRange.startsWith("Semua")) {
    return true;
  }

  if (selectedRange.includes("+")) {
    const min = Number(selectedRange.match(/\d+/)?.[0] || 0);
    return value >= min;
  }

  const [min, max] = selectedRange.match(/\d+/g)?.map(Number) || [];
  return value >= min && value <= max;
}

export function meterValue(meter) {
  return Number(meter.match(/\d+/)?.[0] || 0);
}

export function filterPatients(patients, filterValues, searchQuery = "") {
  const normalizedSearch = searchQuery.trim().toLowerCase();

  return patients.filter((patient) => {
    return (
      (!normalizedSearch ||
        patient.name.toLowerCase().includes(normalizedSearch)) &&
      (!filterValues.status ||
        filterValues.status === "Semua Status" ||
        patient.status === filterValues.status) &&
      isInRange(patient.age, filterValues.age) &&
      isInRange(patient.weight, filterValues.weight) &&
      isInRange(patient.height, filterValues.height) &&
      isInRange(meterValue(patient.meter), filterValues.risk)
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
