import { Button, Form, Input } from 'antd'

import * as S from './style'

export const LoginForm = () => {
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
        label='Пароль'
        name='password'
        rules={[{ required: true, message: 'Пожалуйста, введите пароль' }]}
      >
        <Input.Password />{' '}
        {/* Используем Input.Password для маскировки пароля */}
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Войти
        </Button>
      </Form.Item>
    </S.StyledForm>
  )
}
