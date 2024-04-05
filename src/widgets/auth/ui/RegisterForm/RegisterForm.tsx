import { Button, Form, Input } from 'antd'

import * as S from './style'

export const RegisterForm = () => {
  const onFinish = () => {
    console.log('Success:')
  }

  return (
    <S.StyledForm onFinish={onFinish}>
      <Form.Item
        label='Логин'
        name='login'
        rules={[{ required: true, message: 'Пожалуйста, введите логин' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Email'
        name='email'
        rules={[
          { required: true, message: 'Пожалуйста, введите email' },
          { type: 'email', message: 'Пожалуйста, введите корректный email' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label='Пароль'
        name='password'
        rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item style={{ alignSelf: 'center' }}>
        <Button type='primary' htmlType='submit'>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </S.StyledForm>
  )
}
