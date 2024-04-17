import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";

import Header from "@/components/header";
import LeftMenu from "@/components/left_menu";

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
        <Header />
        <ToastContainer />
        <div className='children_container'>
          <LeftMenu /> 
          <div className="children">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
