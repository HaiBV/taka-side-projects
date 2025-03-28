import { Outlet } from "react-router";

import Footer from "@/layouts/Footer";
import PublicHeader from "@/layouts/PublicHeader";

export default function PublicLayout() {
  return (
    <div className="min-h-dvh flex flex-col">
      <PublicHeader />
      <main className="grow px-global">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
