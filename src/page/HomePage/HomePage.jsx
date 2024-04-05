import { useEffect } from "react";
import { useAppSelector } from "../../store/reduxHooks";

const HomePage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(isLoggedIn);
  }, []);
  return <div> {isLoggedIn ? "YESLOGIN" : "NOLOGIN"}</div>;
};

export default HomePage;
