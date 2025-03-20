import { Route } from "react-router";

import PublicLayout from "@/layouts/PublicLayout";

import Home from "@/pages/Home";
import About from "@/pages/About";

const PublicRoutes = (
  <Route element={<PublicLayout />}>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
  </Route>
);

export default PublicRoutes;
