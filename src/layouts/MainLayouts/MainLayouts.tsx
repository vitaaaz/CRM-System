import {Outlet} from "react-router-dom";
import Sidebar from "@/components/Sidebar/Sidebar";

const MainLayouts = () => {
  return (
    <div className="container">
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayouts;