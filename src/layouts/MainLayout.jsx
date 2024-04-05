import { Layout } from "antd";
import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <Layout
      style={{ width: "100vw", height: "fit-content", minHeight: "100vh" }}
    >
      <Header />
      <Outlet />
    </Layout>
  );
};

export default MainLayout;
