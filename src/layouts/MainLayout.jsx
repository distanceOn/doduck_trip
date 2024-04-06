import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[#EFF4EF]  h-full  w-full">
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
