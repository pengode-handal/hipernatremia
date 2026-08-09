import "./globals.css";

export const metadata = {
  title: "SIHAT - Skrining Risiko Hipernatremia",
  icons: {
    icon: "/Logo5.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
