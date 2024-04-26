import { Header } from "@/components/Header/Header";
import { ReactNode } from "react";

export default async function KartSpaceLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <main>
      <Header />
      {children}
    </main>
  )
}