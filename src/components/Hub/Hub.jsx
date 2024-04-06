import { Button, Card, Col, Row, Space, Typography } from "antd";
import { HubData } from "./hubMock";

// eslint-disable-next-line react/prop-types
const Hub = ({ id }) => {
  return (
    <div className="pt-20">
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <Card
            title={HubData.title + " " + id}
            cover={<img src={HubData.image} alt={HubData.title} />}
          >
            <Typography.Paragraph>{HubData.description}</Typography.Paragraph>

            <Row gutter={16}>
              {HubData.features.map((feature) => (
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
              <Button type="primary">Забронировать</Button>
              <Button type="link">Подробнее</Button>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Контакты">
            <Typography.Paragraph>
              {HubData.contact.address}
              <br />
              {HubData.contact.phone}
              <br />
              {HubData.contact.email}
            </Typography.Paragraph>
          </Card>
          <Card title="Услуги">
            {HubData.services.map((service) => (
              <Typography.Paragraph key={service.id}>
                {service.title} - {service.description}
              </Typography.Paragraph>
            ))}
          </Card>
          <Card title="Как добраться">
            <Typography.Paragraph>{HubData.directions}</Typography.Paragraph>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Hub;
