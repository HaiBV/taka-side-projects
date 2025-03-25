import { Outlet } from "react-router";

import Footer from "@/layouts/Footer";
import PublicHeader from "@/layouts/PublicHeader";

export default function PublicLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <PublicHeader />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
