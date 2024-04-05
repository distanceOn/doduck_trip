import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "../store/reduxHooks";

export const ProtectedAuth = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const location = useLocation();

  if (isLoggedIn)
    return (
      <Navigate
        to={"/"}
        state={{ from: location }} // передаем страницу, с которой перешли, чтобы можно было на нее вернуться
        replace
      />
    );
  return <Outlet />;
};
