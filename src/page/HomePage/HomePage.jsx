import { useEffect } from "react";
import { useAppSelector } from "../../store/reduxHooks";
import { CustomMap } from "../../components/CustomMap/CustomMap";

const HomePage = () => {
  const { isLoggedIn, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    console.log(user);
  }, [user]);
  return (
    <div className="h-full flex  justify-center  bg-[#EFF4EF] ">
      {isLoggedIn ? <CustomMap /> : "NOLOGIN"}
    </div>
  );
};

export default HomePage;
