"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { adminLogin } from "@/lib/auth/session";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin";
const ADMIN_DASHBOARD_URL =
    process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_URL ||
    "http://localhost:3000/admin";

export default function AdminLoginPopup({ open, onClose }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isClosing, setIsClosing] = useState(false);

    const canSubmit = useMemo(() => password.trim().length > 0, [password]);

    useEffect(() => {
        const id = setTimeout(() => {
            if (open) {
                setIsClosing(false);
            }
        });

        return () => clearTimeout(id);
    }, [open]);

    if (!open) {
        return null;
    }

    const handleClose = () => {
        if (isClosing) {
            return;
        }

        setPassword("");
        setError("");
        setIsClosing(true);
        window.setTimeout(() => {
            onClose();
        }, 280);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!canSubmit) {
            setError("Sandi wajib diisi");
            return;
        }

        const result = await adminLogin(password);

        if (!result.success) {
            setError(result.message);
            return;
        }

        window.location.href = ADMIN_DASHBOARD_URL;
    };

    return (
        <div
            className={`admin-login-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4 py-6 font-poppins ${
                isClosing ? "admin-login-overlay--closing" : ""
            }`}>
            <form
                className={`admin-login-panel relative flex flex-col items-center rounded-[5px] border-4 border-white bg-[#f43f46] text-center text-white shadow-[0_10px_28px_rgba(0,0,0,0.22)] ${
                    isClosing ? "admin-login-panel--closing" : ""
                }`}
                onSubmit={handleSubmit}>
                <button
                    type="button"
                    aria-label="Tutup popup admin"
                    className="admin-login-close absolute rounded-[10px] border-[3px] border-white bg-transparent text-white shadow-[-4px_3px_0_white] transition-transform duration-150 hover:-translate-y-0.5 active:translate-x-[-2px] active:translate-y-[2px] active:shadow-none"
                    onClick={handleClose}>
                    <span className="admin-login-close-line absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-current" />
                    <span className="admin-login-close-line absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current" />
                </button>

                <div className="admin-login-content flex flex-col items-center">
                    <Image
                        className="admin-login-logo object-contain brightness-0 invert"
                        width={140}
                        height={185}
                        alt="Logo admin"
                        src="/LogoGuard@2x.png"
                        priority
                    />
                    <h2 className="admin-login-title m-0 font-display font-normal leading-[90%]">
                        SANDI DIPERLUKAN
                    </h2>
                    <input
                        className="admin-login-input rounded-[4px] border-[3px] border-white bg-transparent px-3 font-poppins font-normal text-white outline-none placeholder:text-white/85 focus:ring-2 focus:ring-white/30"
                        type="password"
                        value={password}
                        placeholder="Buktikan keadminan anda"
                        autoFocus
                        onChange={(event) => {
                            setPassword(event.target.value);
                            setError("");
                        }}
                    />
                    <p className="mt-2 min-h-[20px] text-sm font-medium text-white">
                        {error}
                    </p>
                </div>
            </form>
        </div>
    );
}
