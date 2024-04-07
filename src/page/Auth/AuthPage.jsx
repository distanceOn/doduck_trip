import { useEffect, useState } from "react";
import { Card, Tabs, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice";
import { useSignupMutation } from "../../api/authApi";

const AuthPage = () => {
  const dispatch = useDispatch();
  const [signup, { isLoading, isSuccess }] = useSignupMutation();

  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
    dispatch(login());
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onRegisterFinish = (values) => {
    const { name, email, password } = values;
    signup({
      email,
      password,
      username: name,
    });
  };

  const onRegisterFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("УРААА");
    }
  }, [isSuccess]);

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const items = [
    {
      key: "1",
      label: `Вход`,
      children: (
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Пожалуйста, введите email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Войти
            </Button>
          </Form.Item>
        </Form>
      ),
    },
    {
      key: "2",
      label: `Регистрация`,
      children: (
        <Form
          name="registration"
          onFinish={onRegisterFinish}
          onFinishFailed={onRegisterFinishFailed}
        >
          {/* Поля формы регистрации */}
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: "Пожалуйста, введите имя!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Пожалуйста, введите email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button loading={isLoading} type="primary" htmlType="submit" block>
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      ),
    },
  ];

  return (
    <div className="flex justify-center items-center md:pt-[20%] pt-[35%]">
      <Card className="w-full max-w-md shadow-md">
        <Tabs activeKey={activeTab} onChange={handleTabChange} items={items} />
      </Card>
    </div>
  );
};

export default AuthPage;
