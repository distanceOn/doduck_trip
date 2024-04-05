import { useState } from "react";
import { Row, Col, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";

const Header = () => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex items-center justify-between">
      <div className="flex items-center">
        {/* Логотип */}
        <img src="/your-logo.png" alt="Логотип" className="h-10" />
      </div>

      <Row className="hidden md:flex">
        <Col span={24}>
          {/* Ссылки навигации */}
          <a href="#" className="mr-6 hover:text-gray-400">
            Главная
          </a>
          <a href="#" className="mr-6 hover:text-gray-400">
            О нас
          </a>
          <a href="#" className="mr-6 hover:text-gray-400">
            Контакты
          </a>
        </Col>
      </Row>

      {/* Кнопка меню для мобильной версии */}
      <Button
        className="md:hidden text-white"
        type="text"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />

      {/* Боковая панель для мобильной навигации */}
      <Drawer
        title="Меню"
        placement="right"
        onClose={onClose}
        visible={visible}
      >
        <a href="#" className="block py-2 hover:text-gray-400">
          Главная
        </a>
        <a href="#" className="block py-2 hover:text-gray-400">
          О нас
        </a>
        <a href="#" className="block py-2 hover:text-gray-400">
          Контакты
        </a>
      </Drawer>
    </header>
  );
};

export default Header;
