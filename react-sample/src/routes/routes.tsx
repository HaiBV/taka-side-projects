import { BrowserRouter, Routes, Route } from "react-router";

import PublicRoutes from "./PublicRoutes";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {PublicRoutes}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
