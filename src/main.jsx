import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Router, RouterProvider } from 'react-router'
import { router } from './Router/router.jsx'
import AuthProvider from './AuthProvider/authProvider.jsx'
import { FoodProvider } from './AuthProvider/FoodContext.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <FoodProvider>
      <RouterProvider router={router} />
     </FoodProvider>
   </AuthProvider>
  </StrictMode>,
)
