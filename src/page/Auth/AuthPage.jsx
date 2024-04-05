import { useState } from "react";
import { Card, Tabs, Form, Input, Button } from "antd";

const { TabPane } = Tabs;

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-md">
        <Tabs activeKey={activeTab} onChange={handleTabChange}>
          <TabPane tab="Вход" key="login">
            <Form
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Пожалуйста, введите email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Пароль"
                name="password"
                rules={[
                  { required: true, message: "Пожалуйста, введите пароль!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Войти
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
          <TabPane tab="Регистрация" key="registration">
            <Form
              name="registration"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {/* Поля формы регистрации */}
              <Form.Item
                label="Имя"
                name="name"
                rules={[
                  { required: true, message: "Пожалуйста, введите имя!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Пожалуйста, введите email!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Пароль"
                name="password"
                rules={[
                  { required: true, message: "Пожалуйста, введите пароль!" },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Зарегистрироваться
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default AuthPage;
