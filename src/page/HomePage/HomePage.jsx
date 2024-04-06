import { useEffect } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { CustomMap } from "../../components/CustomMap/CustomMap";
import { Col, Layout, Row } from "antd";

const HomePage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(isLoggedIn);
  }, []);
  return (
    <Layout className=" flex  justify-center  bg-[#EFF4EF]">
      {isLoggedIn ? <CustomMap /> : "NOLOGIN"}
    </Layout>
  );
};

export default HomePage;
