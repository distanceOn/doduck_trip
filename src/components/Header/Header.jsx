import { useState } from "react";
import { Row, Col, Drawer, Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";

const Header = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  const [visible, setVisible] = useState(false);

  const showDrawer = () => setVisible(true);
  const onClose = () => setVisible(false);

  return (
    <header className="bg-gray-800 text-white py-4 px-8 flex items-center justify-between fixed top-0 left-0 w-full z-10 shadow-md">
      <div className="flex items-center">
        <img src="/your-logo.png" alt="Логотип" className="h-10" />
      </div>

      <Row className="hidden md:flex">
        {isLoggedIn ? (
          <Col span={24}>
            <Link to="/" className="mr-6 hover:text-gray-400">
              Карта
            </Link>
            <Link to="/login" className="mr-6 hover:text-gray-400">
              Выход
            </Link>
          </Col>
        ) : (
          <Col span={24}>
            <Link to="/" className="mr-6 hover:text-gray-400">
              О нас
            </Link>
            <Link to="/login" className="mr-6 hover:text-gray-400">
              Войти
            </Link>
          </Col>
        )}
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
        {isLoggedIn ? (
          <>
            <Link to="/" className="block py-2 hover:text-gray-400">
              Карта
            </Link>
            <Link to="/login" className="mr-6 hover:text-gray-400">
              Выход
            </Link>
          </>
        ) : (
          <>
            <Link to="/" className="block py-2 hover:text-gray-400">
              О нас
            </Link>
            <Link to="/login" className="mr-6 hover:text-gray-400">
              Войти
            </Link>
          </>
        )}
      </Drawer>
    </header>
  );
};

export default Header;
