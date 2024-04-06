import TabPane from "antd/es/tabs/TabPane";
import Card from "../../components/Card/Card";

import { cardsData } from "./cardsMock";
import { useState } from "react";
import { Tabs } from "antd";

export const PlaceGallery = () => {
  const [currentTab, setCurrentTab] = useState("hub");

  const handleTabChange = (activeKey) => {
    setCurrentTab(activeKey);
  };

  const filteredCards = cardsData.filter((card) => card.type === currentTab);

  return (
    <div className="container mx-auto px-4 md:px-8 md:pt-14">
      <Tabs
        activeKey={currentTab}
        onChange={handleTabChange}
        type="card"
        className="mb-4 md:mb-8"
      >
        <TabPane tab="Хаб" key="hub">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </TabPane>
        <TabPane tab="Ресорт" key="resort">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </TabPane>
        <TabPane tab="Спот" key="spot">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredCards.map((card) => (
              <Card key={card.id} {...card} />
            ))}
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};
