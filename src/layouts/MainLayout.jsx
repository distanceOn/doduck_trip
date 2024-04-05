import { Layout } from "antd";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Layout>
      <Header />
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
