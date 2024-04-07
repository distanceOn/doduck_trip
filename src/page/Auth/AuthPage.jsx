import { useEffect, useState } from "react";
import { Card, Tabs, Form, Input, Button } from "antd";
import { useDispatch } from "react-redux";
import { login, setUser } from "../../store/slices/userSlice";
import { useSigninMutation, useSignupMutation } from "../../api/authApi";

const AuthPage = () => {
  const dispatch = useDispatch();
  const [signup, { isLoading, isSuccess }] = useSignupMutation();
  const [signin, { isLoading: loginLoading, isSuccess: loginSuccess }] =
    useSigninMutation();

  const [activeTab, setActiveTab] = useState("1");

  const handleTabChange = (key) => {
    setActiveTab(key);
  };

  const onEntryFinish = async (values) => {
    const { name, password } = values;
    console.log(values);
    try {
      const result = await signin({
        username: name,
        password,
      }).unwrap();

      dispatch(setUser(result.user));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onEntryFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onRegisterFinish = async (values) => {
    const { name, email, password } = values;
    try {
      const result = await signup({
        email,
        password,
        username: name,
      }).unwrap();
      dispatch(setUser(result.user));
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const onRegisterFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    if (loginSuccess || isSuccess) {
      dispatch(login());
    }
  }, [loginSuccess, isSuccess]);

  const items = [
    {
      key: "1",
      label: `Вход`,
      children: (
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onEntryFinish}
          onFinishFailed={onEntryFinishFailed}
        >
          <Form.Item
            label="Логин"
            name="name"
            initialValue="user111"
            rules={[
              {
                required: true,
                message: "Пожалуйста, введите имя пользователя!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue="useruser"
            label="Пароль"
            name="password"
            rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button
              loading={loginLoading}
              type="primary"
              htmlType="submit"
              block
            >
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
