import { useEffect } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { CustomMap } from "../../components/CustomMap/CustomMap";

const HomePage = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(isLoggedIn);
  }, []);
  return (
    <div className="h-full flex  justify-center  bg-[#EFF4EF] ">
      {isLoggedIn ? <CustomMap /> : "NOLOGIN"}
    </div>
  );
};

export default HomePage;
