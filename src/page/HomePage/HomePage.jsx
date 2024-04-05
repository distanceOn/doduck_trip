import { useEffect } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { CustomMap } from "../../components/CustomMap/CustomMap";

const HomePage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(isLoggedIn);
  }, []);
  return <div> {isLoggedIn ? <CustomMap /> : "NOLOGIN"}</div>;
};

export default HomePage;
