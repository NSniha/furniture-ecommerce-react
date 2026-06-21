import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import SiteLayout from "./layouts/SiteLayout";

import PageTitle from "./components/PageTitle/PageTitle";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Shop from "./pages/Shop/Shop";
import ShopDetails from "./pages/ShopDetails/ShopDetails";
import Contact from "./pages/Contact/Contact";

/* ==================== Scroll to top on route change ==================== */

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return null;
};

const App = () => {
  return (
    <>
      {/* ==================== Dynamic browser page title ==================== */}

      <PageTitle />

      {/* ==================== Page scroll reset ==================== */}

      <ScrollToTop />

      {/* ==================== Website routes ==================== */}

      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<Home />} />

          <Route
            path="about"
            element={<About />}
          />

          <Route
            path="shop"
            element={<Shop />}
          />

          <Route
            path="shop-details/:productId"
            element={<ShopDetails />}
          />

          <Route
            path="contact"
            element={<Contact />}
          />

          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Route>
      </Routes>
    </>
  );
};

export default App;