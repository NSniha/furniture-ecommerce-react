import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

const SiteLayout = () => {
  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />

      <main className="w-full flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default SiteLayout;