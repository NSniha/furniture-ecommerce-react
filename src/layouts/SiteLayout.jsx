import { Outlet } from "react-router-dom";

const SiteLayout = () => {
  return (
    <div className="min-h-screen w-full">
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

export default SiteLayout;