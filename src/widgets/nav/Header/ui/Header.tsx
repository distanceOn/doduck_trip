import { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

import { changeType } from '@/entities/auth/model/authSlice'
import { useAppDispatch, useAppSelector } from '@/shared/model/reduxHooks'

const { Header } = Layout

export const AppHeader = () => {
  const dispatch = useAppDispatch()
  const { type } = useAppSelector(state => state.auth)

  const handleClick = () => {
    dispatch(changeType())
  }

  const [auth, setAuth] = useState({
    label: 'Вход',
    href: '/login',
  })

  const menuItems = [
    { key: '1', label: 'О нас', href: '/' },
    { key: '2', label: auth.label, href: auth.href },
  ]

  const [selectedKey, setSelectedKey] = useState('1')

  useEffect(() => {
    const key = menuItems.findIndex(item => item.href === location.pathname) // Find matching key
    if (key !== -1) {
      setSelectedKey(menuItems[key].key)
    }
  }, [location])

  useEffect(() => {
    if (type === 'login') {
      setAuth({
        label: 'Регистрация',
        href: '/register',
      })
    } else {
      setAuth({
        label: 'Вход',
        href: '/login',
      })
    }
  }, [type])

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className='demo-logo' />
      <Menu
        theme='dark'
        mode='horizontal'
        defaultSelectedKeys={[selectedKey]}
        items={menuItems.map(item => ({
          ...item,
          label: (
            <Link onClick={handleClick} to={item.href}>
              {item.label}
            </Link>
          ),
        }))}
        style={{ flex: 1, minWidth: 0 }}
      />
    </Header>
  )
}
