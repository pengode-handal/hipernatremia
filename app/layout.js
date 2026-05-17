import "./global.css";

export const metadata = {
  title: "Kuis Risiko Hipernatremia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
