import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { AuthProvider } from "@/context/auth";
import RequireAuth from "@/components/requireAuth";
import Constructor from "./constructor";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Medicall Farma | Admin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body className={inter.className}>
      <ToastContainer />
        <AuthProvider>
          <RequireAuth>
            <Constructor>
              {children}
            </Constructor>
          </RequireAuth>
        </AuthProvider>
      </body>
    </html>
  );
}
