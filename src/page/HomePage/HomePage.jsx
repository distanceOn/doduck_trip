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
    <Layout className="pt-20 flex  justify-center align-middle  h-full ">
      <Row gutter={16}>
        <Col xs={24} sm={12} md={8} className="bg-gray-100 p-4">
          {isLoggedIn ? <CustomMap /> : "NOLOGIN"}
        </Col>
      </Row>
    </Layout>
  );
};

export default HomePage;
