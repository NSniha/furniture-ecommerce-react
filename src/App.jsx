import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import SiteLayout from "./layouts/SiteLayout";

import PageTitle from "./components/PageTitle/PageTitle";

import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Shop from "./pages/Shop/Shop";
import ShopDetails from "./pages/ShopDetails/ShopDetails";
import Contact from "./pages/Contact/Contact";

const App = () => {
  return (
    <>
      {/* ==================== Dynamic browser page title ==================== */}

      <PageTitle />

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