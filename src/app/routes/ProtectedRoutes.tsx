// import { Navigate, Outlet, useLocation } from 'react-router-dom'

// import { useUserActions } from '@/entities/user'

// export const ProtectedContent = () => {
//   const { isAuth } = useUserActions()

//   if (!isAuth) return <Navigate to={'/login'} replace />
//   return <Outlet />
// }

// export const ProtectedAuth = () => {
//   const { isAuth } = useUserActions()

//   const location = useLocation()

//   if (isAuth)
//     return (
//       <Navigate
//         to={'/'}
//         state={{ from: location }} // передаем страницу, с которой перешли, чтобы можно было на нее вернуться
//         replace
//       />
//     )
//   return <Outlet />
// }
