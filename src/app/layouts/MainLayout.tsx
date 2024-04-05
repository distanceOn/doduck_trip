import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

import { AppHeader } from '@/widgets/nav/Header'

export const MainLayout = () => (
  <Layout style={{ height: '100vh' }}>
    <Layout>
      <AppHeader />
      <Outlet />
    </Layout>
  </Layout>
)
