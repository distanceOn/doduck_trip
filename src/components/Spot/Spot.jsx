import { Col, Row, Card, List, Image, Rate } from "antd";
import { useGetPlaceQuery } from "../../api/routesApi";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";

// eslint-disable-next-line react/prop-types
const Spot = () => {
  const { id } = useParams();

  const { data, isLoading, isSuccess } = useGetPlaceQuery(id);

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [data]);

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <Row gutter={[16, 16]} style={{ margin: "16px" }}>
      <Col span={12}>
        <Image
          src={data.photos[0]}
          alt={data.name}
          width="100%"
          style={{ borderRadius: "8px" }}
        />
      </Col>
      <Col span={12}>
        <Title level={3} style={{ marginBottom: "8px" }}>
          {data.name}
        </Title>
        <Paragraph style={{ marginBottom: "8px" }}>
          {data.description}
        </Paragraph>
        <Rate value={data.rating} disabled style={{ marginBottom: "8px" }} />
        <Paragraph style={{ marginBottom: "0" }}>
          Контакт: {data.contact}
        </Paragraph>
      </Col>
      <Col span={24}>
        <Title level={4} style={{ marginBottom: "16px" }}>
          Интересные места
        </Title>
        <Row gutter={[16, 16]}>
          {data.interests.map((interest) => (
            <Col span={8} key={interest.name}>
              <Card
                title={interest.name}
                cover={
                  <Image
                    src={data.photos[0]}
                    alt={interest.name}
                    style={{ borderRadius: "8px" }}
                  />
                }
                style={{ borderRadius: "8px", marginBottom: "16px" }}
              >
                <Paragraph>{interest.description}</Paragraph>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
      <Col span={24}>
        <Title level={4} style={{ marginBottom: "16px" }}>
          Услуги
        </Title>
        <List
          dataSource={data.services}
          renderItem={(service) => (
            <List.Item style={{ marginBottom: "16px" }}>
              <List.Item.Meta
                title={service.name}
                description={service.description}
              />
              {service.price && (
                <Paragraph style={{ marginTop: "8px" }}>
                  Цена: {service.price}
                </Paragraph>
              )}
            </List.Item>
          )}
        />
      </Col>
    </Row>
  );
};

export default Spot;
