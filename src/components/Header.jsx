import React from "react";
import { Link } from "react-router-dom";
import {
  Logo,
  IconLabel,
  IconLocator,
  IconProfile,
} from "../assets/icon/index";

const Header = () => {
  return (
    <header className="flex w-full bg-MyGreen1 items-center h-20">
      <div className="flex w-full justify-between items-center mt-3">
        <Logo width="40px" height="40px" className="ml-3" />

        <div className="flex justify-center items-center flex-grow">
          <Link to="/" className="mx-2">
            <IconLabel />
            <p className="font-sans "></p>
          </Link>
          <Link to="/map" className="mx-2">
            <IconLocator />
          </Link>
          <Link to="/profile" className="mx-2">
            <IconProfile />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
