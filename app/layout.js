import "./global.css";

import { ReactNode } from "react";

export const metadata = {
  title: `Admin Dashboard`,
  icons: {
    icon: "/Logo5.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
