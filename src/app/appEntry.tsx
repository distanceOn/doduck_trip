import React from 'react'
import ReactDOM from 'react-dom/client'

import BaseLayout from './layouts/BaseLayout'
import { Providers } from './providers/Providers'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Providers>
      <BaseLayout />
    </Providers>
  </React.StrictMode>,
)
