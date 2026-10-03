import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Biometric Access | Biometric control",
  description: "A high-fidelity biometric access control portfolio concept.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
