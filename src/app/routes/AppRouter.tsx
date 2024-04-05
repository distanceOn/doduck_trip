import { Route, Routes } from 'react-router-dom'

import { AuthPage } from '@/pages/auth'

// import { ProtectedAuth, ProtectedContent } from './ProtectedRoutes'

export const AppRouter = () => (
  <Routes>
    <Route path='/login' element={<AuthPage />} />
    {/* <Route element={<ProtectedAuth />}>
      <Route path='/login' element={<Entry />} />
      <Route path='/register' element={<Register />} />
      <Route path='/password_reset' element={<ResetPass />} />
    </Route>

    <Route path='*' element={<NotFoundPage />} />

    <Route element={<ProtectedContent />}>
      <Route element={<MainLayout />}>
        <Route path='/' element={<ProjectsPage />} />
        <Route path='/partners/:type' element={<PartnersPage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/service/auth' element={<AuthConnectionResultPage />} />

        <Route
          path='/project/:id/integrations'
          element={<IntegrationsPage />}
        />
        <Route
          path='/project/:id/integrations/:integrationId'
          element={<ProjectIntegrationPage />}
        />
        <Route
          path='/project/:id/integrations/marketplace'
          element={<MarketplacePage />}
        />

        <Route
          path='/project/:id/integrations/marketplace/:integration_id'
          element={<MarketIntegrationPage />}
        />
        <Route
          path='/project/:id/settings/:type'
          element={<ProjectSettings />}
        />
      </Route>
    </Route> */}
  </Routes>
)
