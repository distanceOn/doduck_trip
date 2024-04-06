import { Col, Row, Typography, Card, Button, Space, Tabs } from "antd";

const { TabPane } = Tabs;
import { ResortData } from "./resortMock";
// eslint-disable-next-line react/prop-types
const Resort = ({ id }) => {
  return (
    <div className="pt-20">
      <Row gutter={16}>
        <Col xs={24} md={16}>
          <Card
            title={ResortData.title + " " + id}
            cover={<img src={ResortData.image} alt={ResortData.title} />}
          >
            <Typography.Paragraph>
              {ResortData.description}
            </Typography.Paragraph>

            <Tabs>
              <TabPane tab="Описание" key="description">
                <Typography.Paragraph>
                  {ResortData.location.distanceToCity}
                  <br />
                  {ResortData.location.transport}
                  <br />
                  {ResortData.location.landmarks}
                </Typography.Paragraph>
              </TabPane>
              <TabPane tab="Фотографии" key="photos">
                {ResortData.photos.map((photo) => (
                  <img
                    key={photo.id}
                    src={photo.image}
                    alt={ResortData.title}
                    style={{
                      width: "200px",
                      height: "200px",
                      margin: "10px",
                      borderRadius: "8px",
                      ...(photo.isPanorama && {
                        border: "1px solid #ddd",
                      }),
                    }}
                  />
                ))}
              </TabPane>
            </Tabs>

            <Space size={16}>
              <Button type="primary">Забронировать</Button>
              <Button type="link">Подробнее</Button>
            </Space>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card title="Контакты">
            <Typography.Paragraph>
              {ResortData.contact.address}
              <br />
              {ResortData.contact.phone}
              <br />
              {ResortData.contact.email}
            </Typography.Paragraph>
          </Card>

          {ResortData.services.map((service) => (
            <Card title={service.title} key={service.id}>
              {service.types.map((type) => (
                <Typography.Paragraph key={type.id}>
                  {type.title} - {type.description}
                  {type.occupancy && (
                    <span> (Вместимость: {type.occupancy})</span>
                  )}
                  {type.area && <span> (Площадь: {type.area} м²)</span>}
                  {type.electricity && <span> (Электричество: есть)</span>}
                  {type.price && <span> (Цена: {type.price} руб/сутки)</span>}
                </Typography.Paragraph>
              ))}
            </Card>
          ))}
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Card title="Удобства">
            {ResortData.facilities.map((facility) => (
              <Card title={facility.title} key={facility.id}>
                {facility.types.map((type) => (
                  <Typography.Paragraph key={type.id}>
                    {type}
                  </Typography.Paragraph>
                ))}
              </Card>
            ))}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Card title="Питание">
            {ResortData.food.cafes.map((cafe) => (
              <Typography.Paragraph key={cafe.id}>
                {cafe.title} - {cafe.description} ({cafe.cuisine})
              </Typography.Paragraph>
            ))}
            {ResortData.food.restaurants.map((restaurant) => (
              <Typography.Paragraph key={restaurant.id}>
                {restaurant.title} - {restaurant.description} (
                {restaurant.cuisine})
              </Typography.Paragraph>
            ))}
            {ResortData.food.shops.map((shop) => (
              <Typography.Paragraph key={shop.id}>
                {shop.title} - {shop.description} ({shop.assortment})
              </Typography.Paragraph>
            ))}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Card title="Санитарно-бытовые услуги">
            {ResortData.sanitation.showers.map((shower) => (
              <Typography.Paragraph key={shower.id}>
                {shower.title} - {shower.description} ({shower.type}) (
                {shower.workingHours})
              </Typography.Paragraph>
            ))}
            {ResortData.sanitation.toilets.map((toilet) => (
              <Typography.Paragraph key={toilet.id}>
                {toilet.title} - {toilet.description} ({toilet.type}) (
                {toilet.workingHours})
              </Typography.Paragraph>
            ))}
            <Typography.Paragraph>
              {ResortData.sanitation.laundry.title} -{" "}
              {ResortData.sanitation.laundry.description}
              {ResortData.sanitation.laundry.services.map((service) => (
                <span key={service}> ({service})</span>
              ))}
              ({ResortData.sanitation.laundry.workingHours})
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Card title="Техническое обслуживание">
            <Typography.Paragraph>
              {ResortData.technical.carService.title} -{" "}
              {ResortData.technical.carService.description}
              {ResortData.technical.carService.services.map((service) => (
                <span key={service}> ({service})</span>
              ))}
              ({ResortData.technical.carService.workingHours})
            </Typography.Paragraph>
            <Typography.Paragraph>
              {ResortData.technical.chargingStation.title} -{" "}
              {ResortData.technical.chargingStation.description} (
              {ResortData.technical.chargingStation.type}) (
              {ResortData.technical.chargingStation.workingHours})
            </Typography.Paragraph>
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Card title="Торговля">
            {ResortData.trade.souvenirs.map((souvenir) => (
              <Typography.Paragraph key={souvenir.id}>
                {souvenir.title} - {souvenir.description} ({souvenir.assortment}
                )
              </Typography.Paragraph>
            ))}
            {ResortData.trade.food.map((food) => (
              <Typography.Paragraph key={food.id}>
                {food.title} - {food.description} ({food.assortment})
              </Typography.Paragraph>
            ))}
          </Card>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24}>
          <Card title="Развлечения">
            {ResortData.activities.map((activity) => (
              <Card title={activity.title} key={activity.id}>
                {activity.types.map((type) => (
                  <Typography.Paragraph key={type}>{type}</Typography.Paragraph>
                ))}
              </Card>
            ))}
          </Card>
        </Col>
      </Row>

      {ResortData.conferenceHall && (
        <Row gutter={16}>
          <Col xs={24}>
            <Card title="Конференц-зал">
              <Typography.Paragraph>
                {ResortData.conferenceHall.title} -{" "}
                {ResortData.conferenceHall.description}
                (Вместимость: {ResortData.conferenceHall.capacity})
                {ResortData.conferenceHall.equipment.map((equipment) => (
                  <span key={equipment}> ({equipment})</span>
                ))}
              </Typography.Paragraph>
            </Card>
          </Col>
        </Row>
      )}

      <Row gutter={16}>
        <Col xs={24}></Col>

        <Card title="Прокат">
          {ResortData.rentals.bikes.map((bike) => (
            <Typography.Paragraph key={bike.id}>
              {bike.title} - {bike.description} ({bike.type}) ({bike.price}{" "}
              руб/день)
            </Typography.Paragraph>
          ))}
          {ResortData.rentals.quads.map((quad) => (
            <Typography.Paragraph key={quad.id}>
              {quad.title} - {quad.description} ({quad.type}) ({quad.price}{" "}
              руб/час)
            </Typography.Paragraph>
          ))}
        </Card>
      </Row>
    </div>
  );
};

export default Resort;
