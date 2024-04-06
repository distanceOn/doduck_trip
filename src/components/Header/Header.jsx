import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../store/reduxHooks";
import { useLocation } from "react-router-dom";
import {
  IconLocator,
  IconProfile,
  IconMap,
  LogoText,
  IconInfo,
  IconLogin,
} from "../../assets/icon/index";

const Header = () => {
  const { isLoggedIn } = useAppSelector((state) => state.user);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  const isActive = (path) => activeLink === path;

  const linkClass = (path) =>
    `flex flex-col md:flex-row items-center justify-center font-sans transition-all  px-[10px ] mb:px-[30px]  py-[6px] hover:text-[#FF8058] rounded-lg md:hover:text-[#BBCAC9]  ${
      activeLink === path
        ? "md:bg-[#FFFFFF] text-[#1C4D4B]"
        : "md:text-white text-[#BBCAC9]"
    }`;

  const iconColor = (path) => (isActive(path) ? "#1C4D4B" : "#BBCAC9");
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  return (
    <header className="fixed md:top-0 md:bottom-auto bottom-0 left-0 w-full z-10  py-4 px-8 flex items-center justify-between bg-[#fff] md:bg-transparent h-14 ">
      <div className="hidden md:flex items-center -mr-28">
        <LogoText />
      </div>
      <div className="flex items-center justify-center mx-auto w-[80%] ">
        {isLoggedIn ? (
          <div className="flex md:bg-[#1121381F]  rounded-[10px] py-0.5 px-0.5 md:w-auto w-full justify-between">
            <Link
              to="/"
              className={linkClass("/")}
              onClick={() => setActiveLink("/")}
            >
              <IconMap
                color={iconColor("/")}
                w="24px"
                h="24px"
                className={
                  "flex items-center justify-center md:mx-3 mb-1 md:mb-0 "
                }
              />
              <p className="flex items-center justify-center px-2 font-bold ">
                Карта
              </p>
            </Link>

            <Link
              to="/places"
              className={linkClass("/places")}
              onClick={() => setActiveLink("/places")}
            >
              <IconLocator
                color={iconColor("/places")}
                w="24px"
                h="24px"
                className={
                  "flex items-center justify-center md:mx-3 mb-1 md:mb-0 "
                }
              />
              <p className="flex items-center justify-center px-2 font-bold">
                Места
              </p>
            </Link>
            <Link
              to="/login"
              className={linkClass("/profile")}
              onClick={() => setActiveLink("/profile")}
            >
              <IconProfile
                color={iconColor("/profile")}
                h="22px"
                className={
                  "flex items-center justify-center md:mx-3 mb-1 md:mb-0 "
                }
              />
              <p className="flex items-center justify-center px-2 font-bold">
                Профиль
              </p>
            </Link>
          </div>
        ) : (
          <div className="flex md:w-auto w-full justify-between">
            <Link
              to="/about"
              className={linkClass("/about")}
              onClick={() => setActiveLink("/about")}
            >
              <IconInfo
                color={iconColor("/about")}
                h="24px"
                w="24px"
                className={
                  "flex items-center justify-center md:mx-3 mb-1 md:mb-0 "
                }
              />
              <p className="flex items-center justify-center px-2 font-bold">
                {" "}
                О нас
              </p>
            </Link>
            <Link
              to="/login"
              className={linkClass("/login")}
              onClick={() => setActiveLink("/login")}
            >
              <IconLogin
                color={iconColor("/login")}
                h="24px"
                w="24px"
                className={
                  "flex items-center justify-center md:mx-3 mb-1 md:mb-0 "
                }
              />
              <p className="flex items-center justify-center px-2 font-bold">
                Войти
              </p>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
