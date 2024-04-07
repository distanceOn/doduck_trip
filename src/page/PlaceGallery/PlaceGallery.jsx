import TabPane from "antd/es/tabs/TabPane";
import Card from "../../components/Card/Card";

import { cardsData } from "./cardsMock";
import { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useGetPlacesQuery } from "../../api/routesApi";

export const PlaceGallery = () => {
  const { data, isLoading, isSuccess } = useGetPlacesQuery();

  useEffect(() => {
    if (isSuccess) {
      console.log(data);
    }
  }, [isSuccess]);

  const [currentTab, setCurrentTab] = useState("Hub");

  const [totalData, setTotalData] = useState(cardsData);

  useEffect(() => {
    if (isSuccess) {
      setTotalData(data);
    }
  }, [data]);

  const handleTabChange = (activeKey) => {
    setCurrentTab(activeKey);
  };

  const filteredCards = totalData.filter((card) => card.type === currentTab);

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <div className="container mx-auto px-4 md:px-8 md:pt-14">
      <Tabs
        activeKey={currentTab}
        onChange={handleTabChange}
        type="card"
        className="mb-4 md:mb-8"
      >
        <TabPane tab="Хаб" key="Hub">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCards.map((card) => (
              <Card key={card.name} {...card} />
            ))}
          </div>
        </TabPane>
        <TabPane tab="Ресорт" key="Resort">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCards.map((card) => (
              <Card key={card.name} {...card} />
            ))}
          </div>
        </TabPane>
        <TabPane tab="Спот" key="Pitstop">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCards.map((card) => (
              <Card key={card.name} {...card} />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
