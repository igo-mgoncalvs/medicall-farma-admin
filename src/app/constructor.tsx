'use client'

import Header from "@/components/header";
import LeftMenu from "@/components/left_menu";
import { usePathname } from "next/navigation";

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