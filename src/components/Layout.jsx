import React, { useContext, useLayoutEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { FaBars } from "react-icons/fa";
import { AppContext } from "../context";

const Layout = () => {
  const { user } = useContext(AppContext);
  const [toggle, setToggle] = useState(false);
  const location = useLocation();

  useLayoutEffect(() => {
    setToggle(false);
  }, [location]);

  if (window.location.pathname === "/")
    return <Navigate to="/slides-management" />;

  return (
    <div className="relative flex h-screen font-poppins">
      <Navbar {...{ toggle, setToggle }} />

      <div className="w-full h-screen overflow-y-auto">
        <div className="w-full border-b shadow">
          {/* Menu btn (bars icon) */}
          <button
            onClick={() => setToggle(true)}
            className={`md:hidden lg:hidden pl-3 py-3.5 text-black`}
          >
            <FaBars />
          </button>
        </div>

        {/* Backdrop (when menu opens) */}
        <div
          onClick={() => setToggle(false)}
          className={`${
            toggle ? "" : "hidden"
          } md:hidden fixed inset-0 bg-black/40 z-[2]`}
        />

        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
