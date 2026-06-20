import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Home from "../../pages/Home/Home";
import Products from "../../pages/Products/Products";
import About from "../../pages/About/About";
import PhotoStories from "../../pages/PhotoStories/PhotoStories";
import Contacts from "../../pages/Contacts/Contacts";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";

function AppRouter() {
  return (
    <>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />
        <Route path="about" element={<About />} />
        <Route path="stories" element={<PhotoStories />} />
        <Route path="contacts" element={<Contacts />} />
      </Route>
    </Routes>
    </>
  );
}

export default AppRouter;