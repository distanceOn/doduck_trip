import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/reduxHooks";

export const ProtectedContent = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  if (!isLoggedIn) return <Navigate to={"/login"} replace />;
  return <Outlet />;
};
