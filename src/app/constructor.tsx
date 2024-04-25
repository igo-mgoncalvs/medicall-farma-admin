'use client'

import Header from "@/components/header";
import LeftMenu from "@/components/left_menu";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function Constructor ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const route = usePathname()
  const itsLoginPage = route === '/login'

  return (
    <div>
      {!itsLoginPage && (
        <Header />
      )}
      <ToastContainer />
      <div className='children_container'>
        {!itsLoginPage && (
          <LeftMenu /> 
        )}
        <div className={!itsLoginPage ? 'children': ''}>
          {children}
        </div>
      </div>
    </div>
  )
}