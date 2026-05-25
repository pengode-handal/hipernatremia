"use client";

import { useState } from "react";
import Image from "next/image";
import { filters, patients } from "./dashboard-data";
import { filterRespondents, getPaginationItems } from "@/lib/dashboard-utils";
import styles from "./dashboard.module.css";

function DropdownButton({
    id,
    label,
    options,
    value,
    isOpen,
    className = "",
    onOpen,
    onSelect,
}) {
    return (
        <div className={`${styles.dropdownWrap} ${className}`}>
            <button
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                className={`${styles.dropdown} ${isOpen ? styles.dropdownOpen : ""}`}
                type="button"
                onClick={() => onOpen(id)}>
                <span>{value || label}</span>
                <span className={styles.chevron} aria-hidden="true" />
            </button>

            <div
                className={`${styles.dropdownMenu} ${
                    isOpen ? styles.dropdownMenuOpen : ""
                }`}
                role="listbox">
                {options.map((option) => (
                    <button
                        aria-selected={option === value}
                        className={styles.dropdownOption}
                        key={option}
                        role="option"
                        type="button"
                        onClick={() => onSelect(id, option)}>
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
}

const DBDashboard = ({ respondent }) => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [filterValues, setFilterValues] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [perPage, setPerPage] = useState("25");
    const [currentPage, setCurrentPage] = useState(1);

    function toggleDropdown(id) {
        setOpenDropdown((current) => (current === id ? null : id));
    }

    function selectFilter(id, value) {
        setFilterValues((current) => ({ ...current, [id]: value }));
        setOpenDropdown(null);
    }

    function updatePerPage(event) {
        const value = event.target.value.replace(/\D/g, "");
        setPerPage(value);
        setCurrentPage(1);
    }

    function updateSearch(event) {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    }

    const filteredRespondents = filterRespondents(
        respondent,
        filterValues,
        searchQuery,
    );

    const perPageNumber = Math.max(1, Number(perPage) || 1);
    const totalPages = Math.max(
        1,
        Math.ceil(filteredRespondents.length / perPageNumber),
    );
    const safePage = Math.min(currentPage, totalPages);
    const startIndex = (safePage - 1) * perPageNumber;
    const visibleRespondents = filteredRespondents.slice(
        startIndex,
        startIndex + perPageNumber,
    );

    function goToPage(page) {
        setCurrentPage(Math.min(Math.max(page, 1), totalPages));
    }

    const paginationItems = getPaginationItems(safePage, totalPages);

    function resetFilters() {
        setFilterValues({});
        setOpenDropdown(null);
        setCurrentPage(1);
    }

    return (
        <main className={styles.dbdashboard}>
            <header className={styles.header}>
                <Image
                    alt=""
                    className={styles.logo}
                    height={102}
                    priority
                    src="../Logo5.svg"
                    width={78}
                />
                <div className={styles.headerText}>
                    <h1>DASHBOARD ANMIR</h1>
                    <p>
                        Laman ini hanya diperuntukkan kepada Anson dan Mirza,
                        kecuali atas perizinan mereka
                    </p>
                </div>
            </header>

            <section
                className={styles.filterPanel}
                aria-label="Filter data pasien">
                <div className={styles.filterRow}>
                    <span className={styles.filterLabel}>FILTER:</span>
                    {filters.map((filter) => (
                        <DropdownButton
                            id={filter.key}
                            isOpen={openDropdown === filter.key}
                            key={filter.key}
                            label={filter.label}
                            options={filter.options}
                            value={filterValues[filter.key]}
                            onOpen={toggleDropdown}
                            onSelect={selectFilter}
                        />
                    ))}
                    <button
                        className={`${styles.resetFilter} ${styles.resetFilterInline}`}
                        type="button"
                        onClick={resetFilters}>
                        Reset
                    </button>
                </div>

                <div className={styles.resetRow}>
                    <button
                        className={`${styles.resetFilter} ${styles.resetFilterDesktop}`}
                        type="button"
                        onClick={resetFilters}>
                        Reset
                    </button>
                </div>

                <div className={styles.searchRow}>
                    <label className={styles.searchBox}>
                        <Image
                            alt=""
                            height={23}
                            src="../svg14.svg"
                            width={23}
                        />
                        <input
                            placeholder="Cari nama pasien..."
                            type="text"
                            value={searchQuery}
                            onChange={updateSearch}
                        />
                    </label>

                    <div className={styles.pageTools}>
                        <span className={styles.perPageLabel}>Per halaman</span>
                        <input
                            aria-label="Jumlah data per halaman"
                            className={styles.perPageInput}
                            inputMode="numeric"
                            min="1"
                            type="text"
                            value={perPage}
                            onChange={updatePerPage}
                        />
                        <span className={styles.pageCount}>
                            {filteredRespondents.length}/400
                        </span>
                    </div>
                </div>
            </section>

            <section className={styles.table} aria-label="Daftar hasil asesmen">
                <div className={`${styles.tableGrid} ${styles.tableHeader}`}>
                    <span>Nama</span>
                    <span>Status</span>
                    <span>Umur</span>
                    <span>BB</span>
                    <span>TB</span>
                    <span>Risiko Meter</span>
                </div>

                {visibleRespondents.map((respondent, index) => (
                    <div
                        className={`${styles.tableGrid} ${styles.tableRow} ${
                            styles[respondent.status]
                        }`}
                        key={`${respondent.name}-${respondent.status}-${index}`}>
                        <span data-label="Nama">{respondent.name}</span>
                        <span data-label="Status">{respondent.status}</span>
                        <span data-label="Umur">{respondent.umur}</span>
                        <span data-label="BB">{respondent.beratBadan}</span>
                        <span data-label="TB">{respondent.tinggiBadan}</span>
                        <span data-label="Risiko Meter">
                            {respondent.risikoMeter}
                        </span>
                    </div>
                ))}
            </section>

            <nav
                className={styles.pagination}
                aria-label="Navigasi halaman data">
                <button
                    disabled={safePage === 1}
                    type="button"
                    onClick={() => goToPage(safePage - 1)}>
                    Sebelumnya
                </button>
                <div className={styles.pageNumbers}>
                    {paginationItems.map((item) => {
                        if (typeof item === "string") {
                            return (
                                <span
                                    className={styles.paginationEllipsis}
                                    key={item}>
                                    ...
                                </span>
                            );
                        }

                        return (
                            <button
                                aria-current={
                                    item === safePage ? "page" : undefined
                                }
                                key={item}
                                type="button"
                                onClick={() => goToPage(item)}>
                                {item}
                            </button>
                        );
                    })}
                </div>
                <button
                    disabled={safePage === totalPages}
                    type="button"
                    onClick={() => goToPage(safePage + 1)}>
                    Selanjutnya
                </button>
            </nav>
        </main>
    );
};

export default DBDashboard;
