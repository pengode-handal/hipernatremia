import "./global.css";

import { ReactNode } from "react";

export const metadata = {
    title: `Admin Dashboard`,
    icons: {
        icon: "/Logo5.svg",
    },
};

export default function AdminLayout({ children }) {
    return <>{children}</>;
}
