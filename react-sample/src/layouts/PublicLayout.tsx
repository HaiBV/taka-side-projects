import { Outlet } from "react-router";

import Footer from "@/layouts/Footer";
import PublicHeader from "@/layouts/PublicHeader";

export default function PublicLayout() {
  return (
    <>
      <PublicHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
