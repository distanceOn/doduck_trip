import { Col, Row, Typography, Card, Button, Space } from "antd";
import { spotData } from "./spotMock";

// eslint-disable-next-line react/prop-types
const Spot = ({ id }) => {
  return (
    <div className="pt-20">
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <Card
            title={spotData.title + " " + id}
            cover={<img src={spotData.image} alt={spotData.title} />}
          >
            <Typography.Paragraph>{spotData.description}</Typography.Paragraph>

            <Row gutter={16}>
              {spotData.features.map((feature) => (
                <Col xs={24} sm={12} md={8} key={feature.id}>
                  <Card
                    title={feature.title}
                    bordered={false}
                    style={{
                      backgroundColor: feature.color,
                      color: "white",
                      borderRadius: "8px",
                    }}
                  >
                    <Typography.Paragraph>
                      {feature.description}
                    </Typography.Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>

            <Space size={16}>
              <Button type="primary">dddsdsdsd</Button>
              <Button type="link">Подробнее</Button>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Контакты">
            <Typography.Paragraph>
              {spotData.contact.address}
              <br />
              {spotData.contact.phone}
              <br />
              {spotData.contact.email}
            </Typography.Paragraph>
          </Card>
          <Card title="Как добраться">
            <Typography.Paragraph>{spotData.directions}</Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Spot;
