import { BrowserRouter, Routes, Route } from "react-router";

import Home from "@/pages/Home";
import About from "@/pages/About";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
